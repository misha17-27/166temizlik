"use client";

import { FormEvent, useId } from "react";

type LeadFormLabels = {
  name: string;
  phone: string;
  email?: string;
  service?: string;
  address?: string;
  note: string;
  submit: string;
};

type WhatsAppLeadFormProps = {
  whatsappHref: string;
  labels: LeadFormLabels;
  title?: string;
  intro?: string;
  defaultService?: string;
  serviceOptions?: string[];
  showEmail?: boolean;
  className?: string;
  headingClassName?: string;
  introClassName?: string;
  fieldsClassName?: string;
  inputClassName: string;
  textareaClassName: string;
  selectClassName?: string;
  labelClassName?: string;
  buttonClassName: string;
};

function buildWhatsAppUrl(baseHref: string, message: string) {
  const fallback = "https://api.whatsapp.com/send?phone=994502854477";

  try {
    const url = new URL(baseHref || fallback);
    url.searchParams.set("text", message);
    return url.toString();
  } catch {
    const separator = fallback.includes("?") ? "&" : "?";
    return `${fallback}${separator}text=${encodeURIComponent(message)}`;
  }
}

function valueFrom(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function labelText(value: string | undefined, fallback: string) {
  return (value || fallback).replace(/[:：]\s*$/, "");
}

export function WhatsAppLeadForm({
  whatsappHref,
  labels,
  title,
  intro,
  defaultService,
  serviceOptions = [],
  showEmail = false,
  className,
  headingClassName,
  introClassName,
  fieldsClassName = "grid gap-3",
  inputClassName,
  textareaClassName,
  selectClassName,
  labelClassName,
  buttonClassName,
}: WhatsAppLeadFormProps) {
  const id = useId();
  const serviceId = `${id}-service`;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = valueFrom(formData, "name");
    const phone = valueFrom(formData, "phone");
    const email = valueFrom(formData, "email");
    const service = valueFrom(formData, "service");
    const address = valueFrom(formData, "address");
    const note = valueFrom(formData, "note");
    const lines = [
      "Yeni sifariş",
      name ? `${labelText(labels.name, "Ad")}: ${name}` : "",
      phone ? `${labelText(labels.phone, "Telefon")}: ${phone}` : "",
      email ? `${labelText(labels.email, "Email")}: ${email}` : "",
      service ? `${labelText(labels.service, "Xidmət")}: ${service}` : "",
      address ? `${labelText(labels.address, "Ünvan")}: ${address}` : "",
      note ? `${labelText(labels.note, "Qeyd")}: ${note}` : "",
      typeof window !== "undefined" ? `Səhifə: ${window.location.href}` : "",
    ].filter(Boolean);

    window.open(buildWhatsAppUrl(whatsappHref, lines.join("\n")), "_blank", "noopener,noreferrer");
  }

  return (
    <form className={className} onSubmit={handleSubmit}>
      {title ? <h2 className={headingClassName}>{title}</h2> : null}
      {intro ? <p className={introClassName}>{intro}</p> : null}
      <div className={fieldsClassName}>
        <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
          <input name="name" className={inputClassName} placeholder={labels.name} aria-label={labels.name} autoComplete="name" />
          <input name="phone" className={inputClassName} placeholder={labels.phone} aria-label={labels.phone} autoComplete="tel" required />
        </div>
        {showEmail ? <input name="email" className={inputClassName} placeholder={labels.email ?? "Email"} aria-label={labels.email ?? "Email"} autoComplete="email" /> : null}
        {serviceOptions.length ? (
          <>
            {labels.service ? <label htmlFor={serviceId} className={labelClassName}>{labels.service}</label> : null}
            <select id={serviceId} name="service" className={selectClassName ?? inputClassName} defaultValue={defaultService} aria-label={labels.service ?? "Xidmət"}>
              {serviceOptions.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </>
        ) : null}
        {labels.address ? <input name="address" className={inputClassName} placeholder={labels.address} aria-label={labels.address} autoComplete="street-address" /> : null}
        <textarea name="note" className={textareaClassName} placeholder={labels.note} aria-label={labels.note} />
        <button type="submit" className={buttonClassName}>
          {labels.submit}
        </button>
      </div>
    </form>
  );
}
