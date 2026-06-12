from fastapi import APIRouter, HTTPException

from app.schemas import ContactForm, StatusResponse
from app.services import email

router = APIRouter(prefix="/api", tags=["contact"])


@router.post("/contact", response_model=StatusResponse)
def contact(form: ContactForm) -> StatusResponse:
    try:
        email.send_contact_email(form.name, form.email, form.message)
    except Exception:
        raise HTTPException(status_code=502, detail="Failed to send email.")
    return StatusResponse()
