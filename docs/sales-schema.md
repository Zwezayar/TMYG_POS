# Sales Tables Schema (Verify in Supabase)

Use this to confirm your existing `sales` and `sale_items` tables have the required columns. **Do not create new tables**—only add missing columns if needed.

## sales

| Column        | Type           | Required | Notes                                      |
|---------------|----------------|----------|--------------------------------------------|
| id            | serial / uuid  | Yes      | Primary key, auto-generated                 |
| inv_id        | uuid / text    | Yes      | Used to store **cashier_id** (auth user id). If your table has `cashier_id` instead, update the checkout API to use that column. |
| total_amount  | numeric        | Yes      | Sum of (price × quantity) for the sale     |
| status        | text           | No       | e.g. `completed`                            |
| remark        | text           | No       | Optional                                   |
| created_at    | timestamptz    | No       | Default now()                              |
| type          | text           | No       | e.g. Shop / Deli                           |
| customer_name | text           | No       | Optional                                   |
| payment_method| text           | No       | Optional                                   |
| is_cod        | boolean        | No       | Optional                                   |
| slip_url      | text           | No       | Optional                                   |

**POS uses:** `inv_id` (as cashier), `total_amount`, `status`, `created_at`. Other columns can be null.

## sale_items

| Column       | Type   | Required | Notes                    |
|--------------|--------|----------|--------------------------|
| id           | serial | Yes      | Primary key              |
| sale_id      | (FK)   | Yes      | References sales.id      |
| product_id   | int    | Yes      | References products.id    |
| quantity     | int    | Yes      | Units sold               |
| price_at_sale| numeric| Yes      | Unit price at time of sale |
| remark       | text   | No       | Optional                 |

**POS uses:** `sale_id`, `product_id`, `quantity`, `price_at_sale`.

## products (for stock)

Ensure `products.stock_quantity` exists. Checkout decrements it by quantity sold.
