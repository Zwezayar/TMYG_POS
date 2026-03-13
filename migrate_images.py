import base64
import json
import mimetypes
import uuid
from urllib import parse, request

SUPABASE_URL = ""
SUPABASE_KEY = ""


def build_headers(content_type=None):
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
    }
    if content_type:
        headers["Content-Type"] = content_type
    return headers


def http_request(method, url, headers, data=None):
    req = request.Request(url, method=method, headers=headers, data=data)
    with request.urlopen(req) as res:
        body = res.read()
        return res.status, body


def is_base64_blob(value):
    if not value or len(value) < 100:
        return False
    try:
        base64.b64decode(value, validate=True)
        return True
    except Exception:
        return False


def parse_data_uri(value):
    if not value.startswith("data:"):
        return None, None
    if "," not in value:
        return None, None
    header, encoded = value.split(",", 1)
    if ";base64" not in header:
        return None, None
    mime = header.split(";")[0].replace("data:", "") or "image/jpeg"
    try:
        decoded = base64.b64decode(encoded, validate=True)
    except Exception:
        return None, None
    return mime, decoded


def guess_extension(mime):
    if mime == "image/jpeg":
        return "jpg"
    if mime == "image/png":
        return "png"
    if mime == "image/webp":
        return "webp"
    ext = mimetypes.guess_extension(mime or "")
    if ext:
        return ext.lstrip(".")
    return "jpg"


def fetch_products(offset, limit):
    query = parse.urlencode(
        {
            "select": "id,image_url",
            "order": "id.asc",
            "limit": str(limit),
            "offset": str(offset),
        }
    )
    url = f"{SUPABASE_URL}/rest/v1/products?{query}"
    status, body = http_request("GET", url, build_headers())
    if status != 200:
        raise RuntimeError(f"Fetch failed with status {status}: {body.decode('utf-8', errors='ignore')}")
    return json.loads(body.decode("utf-8"))


def upload_image(path, mime, data):
    url = f"{SUPABASE_URL}/storage/v1/object/product-images/{path}?upsert=true"
    status, body = http_request("POST", url, build_headers(mime), data=data)
    if status not in (200, 201):
        raise RuntimeError(f"Upload failed with status {status}: {body.decode('utf-8', errors='ignore')}")
    return f"{SUPABASE_URL}/storage/v1/object/public/product-images/{path}"


def update_product_image(product_id, public_url):
    query = parse.urlencode({"id": f"eq.{product_id}"})
    url = f"{SUPABASE_URL}/rest/v1/products?{query}"
    payload = json.dumps({"image_url": public_url}).encode("utf-8")
    status, body = http_request("PATCH", url, build_headers("application/json"), data=payload)
    if status not in (200, 204):
        raise RuntimeError(f"Update failed with status {status}: {body.decode('utf-8', errors='ignore')}")


def should_skip(value):
    if not value:
        return True
    if value.startswith("http"):
        return True
    if value.startswith("data:"):
        return False
    if "supabase.co/storage" in value:
        return True
    return False


def migrate():
    if not SUPABASE_URL or not SUPABASE_KEY:
        raise RuntimeError("SUPABASE_URL and SUPABASE_KEY must be set.")
    
    offset = 0
    limit = 500
    migrated = 0
    
    print("🚀 Migration စတင်နေပါပြီ... ခဏစောင့်ပေးပါရှင်။")
    
    while True:
        rows = fetch_products(offset, limit)
        if not rows:
            break
        
        print(f"📦 ပစ္စည်း {len(rows)} ခုကို စစ်ဆေးနေပါတယ်။")
        
        for row in rows:
            product_id = row.get("id")
            image_url = row.get("image_url")
            
            if should_skip(image_url):
                continue
            
            print(f"🔄 Processing Product ID: {product_id}...")
            
            if image_url and image_url.startswith("data:"):
                mime, data = parse_data_uri(image_url)
                if not data:
                    print(f"   ⚠️ ID {product_id}: Data URI format မမှန်ပါ။")
                    continue
            else:
                if not is_base64_blob(image_url or ""):
                    continue
                mime = "image/jpeg"
                try:
                    data = base64.b64decode(image_url, validate=True)
                except Exception:
                    print(f"   ⚠️ ID {product_id}: Base64 decode လုပ်မရပါ။")
                    continue
            
            ext = guess_extension(mime)
            path = f"{product_id}/{uuid.uuid4().hex}.{ext}"
            
            # Upload တင်ခြင်း
            public_url = upload_image(path, mime, data)
            print(f"   ✅ Uploaded: {path}")
            
            # Database update လုပ်ခြင်း
            update_product_image(product_id, public_url)
            print(f"   ✨ Database updated!")
            
            migrated += 1
            
        offset += limit
        
    print(f"🏁 ပြီးစီးပါပြီ။ စုစုပေါင်း {migrated} ခု ပြောင်းလဲခဲ့ပါတယ်။")
if __name__ == "__main__":
    migrate()
