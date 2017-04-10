from flask import Flask, request
from twilio import twiml
import json
import os
import requests


app = Flask(__name__)

TWILIO_SID = 'AC9cf7aec71223f7cecc9e2eb1c1d7632a'
TWILIO_TOKEN = '6ac291602946ffc65566f1c4068d3055'
TWILIO_PHONE_NUMBER = '+15107579475'

# @app.route("/voice", methods=['GET', 'POST'])
# def voice():
#     # Start our TwiML response
#     response = twiml.Response()
#     response.say('Hi! I want to know what do you think about coding.')
#     response.record(maxLength="10", action="/recording")
#     response.hangup()

#     return str(response)


# @app.route("/recording", methods=['GET', 'POST'])
# def recording():
#     recording_url = request.values.get("RecordingUrl", None)
#     print(recording_url)

#     response = twiml.Response()
#     response.say("Thanks for howling... take a listen to what you howled.")
#     response.play(recording_url)
#     response.say("Goodbye.")

#     return str(response)


@app.route("/callback", methods=['POST', 'PUT'])
def callback():
    print('received something!')
    print(request.values['url'])
    payload_url = request.values['url']
    
    # # If the Watson Speech to Text add-on found nothing, return immediately
    # if 'ibm_watson_speechtotext' not in add_ons['results']:
    #     return 'Add Watson Speech to Text add-on in your Twilio console'
    
    # payload_url = add_ons["results"]["ibm_watson_speechtotext"]["payload"][0]["url"]
    # payload_url =  "https://api.twilio.com/2010-04-01/Accounts/AC9cf7aec71223f7cecc9e2eb1c1d7632a/Recordings/REcc601ca04f100ba3a044e0a59ece68cf/AddOnResults/XR534b2cee8dfe526814a0fdbc4164d2db/Payloads/XH363ec1a223e198bef007c01321be24db/Data"
    # account_sid = os.environ.get(TWILIO_SID)
    # auth_token = os.environ.get(TWILIO_TOKEN)

    resp = requests.get(payload_url, auth=(TWILIO_SID, TWILIO_TOKEN)).json()
    # console.log(resp)
    results = resp['results'][0]['results']
    transcripts = map(lambda res: res['alternatives'][0]['transcript'], results)
    print(transcripts)
    return ''.join(transcripts)


if __name__ == "__main__":
    app.run()