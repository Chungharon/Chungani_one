"""Email + newsletter delivery via Resend."""

import resend

from app.config import settings


def _ensure_client() -> None:
    if settings.resend_dry_run:
        return
    if not settings.resend_api_key:
        raise RuntimeError("Email service is not configured.")
    resend.api_key = settings.resend_api_key


def _contact_html(name: str, email: str, message: str) -> str:
    return (
        "<div>"
        "<h1>Contact form submission</h1>"
        f"<p>From <strong>{name}</strong> at {email}</p>"
        "<h2>Message:</h2>"
        f"<p>{message}</p>"
        "</div>"
    )


def send_contact_email(name: str, email: str, message: str) -> None:
    """Send a contact-form submission to the site owner."""
    _ensure_client()
    if settings.resend_dry_run:
        print(f"[dry-run] contact email from {name} <{email}>: {message!r}")
        return
    resend.Emails.send(
        {
            "from": settings.resend_from_email,
            "to": [settings.owner_email],
            "reply_to": email,
            "subject": f"New message from {name}",
            "html": _contact_html(name, email, message),
        }
    )


def add_subscriber(email: str) -> None:
    """Add an email to the Resend newsletter audience."""
    _ensure_client()
    if settings.resend_dry_run:
        print(f"[dry-run] subscribe {email}")
        return
    if not settings.resend_audience_id:
        raise RuntimeError("Newsletter service is not configured.")
    resend.Contacts.create(
        {
            "email": email,
            "audience_id": settings.resend_audience_id,
        }
    )
