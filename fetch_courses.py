#!/usr/bin/env python3
import urllib.request
import urllib.parse
import json
import os

API_KEY = os.environ.get('GOLF_API_KEY', '')
print(f"API_KEY: {'postavljen (' + str(len(API_KEY)) + ' znakova)' if API_KEY else 'NIJE POSTAVLJEN'}")

url = 'https://api.golfcourseapi.com/v1/search?search_query=Neuss'
print(f"URL: {url}")

try:
    req = urllib.request.Request(url, headers={'Authorization': f'Key {API_KEY}'})
    with urllib.request.urlopen(req, timeout=15) as response:
        status = response.status
        raw = response.read()
        print(f"HTTP status: {status}")
        print(f"Odgovor ({len(raw)} bajta):")
        print(raw.decode('utf-8'))
except urllib.error.HTTPError as e:
    print(f"HTTP greška {e.code}: {e.reason}")
    print(e.read().decode('utf-8'))
except Exception as e:
    print(f"Greška: {type(e).__name__}: {e}")

# Spremi prazan JSON da ne bude 2 bajta
with open('courses.json', 'w') as f:
    json.dump([], f)
print("courses.json zapisano")
