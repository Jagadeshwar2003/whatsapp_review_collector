# app/twilio_helpers.py

from twilio.twiml.messaging_response import MessagingResponse

def twiml_message(body: str) -> str:
    """Creates the TwiML response required by Twilio."""
    response = MessagingResponse()
    response.message(body)
    return str(response)