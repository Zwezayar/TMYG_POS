'use client';

export type DeliveryPartnerOption = {
  id: string;
  name: string;
};

export function DeliveryPartnerSelect({
  value,
  onChange,
  partners,
  loading,
  disabled,
  label = 'Delivery Partner',
  placeholder = 'Select delivery partner',
  disabledPlaceholder = 'Not required in Shop mode',
  className = 'h-11',
}: {
  value: string;
  onChange: (value: string) => void;
  partners: DeliveryPartnerOption[];
  loading: boolean;
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  disabledPlaceholder?: string;
  className?: string;
}) {
  return (
    <label className="space-y-2">
      <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled || loading}
        className={`w-full rounded-xl border border-input bg-background px-3 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      >
        <option value="">
          {disabled
            ? disabledPlaceholder
            : loading
              ? 'Loading partners...'
              : placeholder}
        </option>
        {partners.map((partner) => (
          <option key={partner.id} value={partner.id}>
            {partner.name}
          </option>
        ))}
      </select>
    </label>
  );
}
