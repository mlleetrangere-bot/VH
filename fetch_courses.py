#!/usr/bin/env python3
import urllib.request
import urllib.parse
import json
import os
import time

API_KEY = os.environ.get('GOLF_API_KEY', '')
print(f"API_KEY postavljen: {'DA' if API_KEY else 'NE'}")
print(f"API_KEY duljina: {len(API_KEY)}")

BASE_URL = 'https://api.golfcourseapi.com/v1/search?search_query='

QUERIES = [
    'Dusseldorf', 'Neuss', 'Krefeld', 'Monchengladbach', 'Koln',
    'Bonn', 'Dortmund', 'Essen', 'Bochum', 'Duisburg', 'Wuppertal',
    'Aachen', 'Munster', 'Bielefeld', 'Munchen', 'Berlin',
    'Hamburg', 'Frankfurt', 'Stuttgart', 'Leipzig', 'Hannover',
    'Wien', 'Salzburg', 'Graz', 'Innsbruck',
    'Zurich', 'Genf', 'Basel', 'Bern',
    'Amsterdam', 'Rotterdam', 'Utrecht', 'Eindhoven',
    'Brussel', 'Antwerpen', 'Gent',
    'Luxembourg',
    'Paris', 'Lyon', 'Marseille', 'Bordeaux', 'Nice',
    'Madrid', 'Barcelona', 'Sevilla', 'Malaga', 'Marbella',
    'Lisbon', 'Porto', 'Algarve',
    'Rome', 'Milan', 'Florence', 'Venice', 'Turin',
    'London', 'Edinburgh', 'Glasgow', 'Manchester',
    'Dublin', 'Cork',
    'Stockholm', 'Oslo', 'Copenhagen', 'Helsinki',
    'Warsaw', 'Krakow', 'Prague', 'Budapest',
    'Zagreb', 'Ljubljana',
    'golf Germany', 'golf Austria', 'golf Switzerland',
    'golf Netherlands', 'golf Belgium', 'golf France',
    'golf Spain', 'golf Italy', 'golf England', 'golf Scotland',
    'golf Ireland', 'golf Portugal', 'golf Sweden', 'golf Norway',
    'golf Denmark', 'golf Finland', 'golf Poland', 'golf Croatia',
]

all_courses = {}

for i, query in enumerate(QUERIES):
    try:
        url = BASE_URL + urllib.parse.quote(query)
        print(f"[{i+1}/{len(QUERIES)}] Trazim: {query}")
        req = urllib.request.Request(
            url,
            headers={'Authorization': f'Key {API_KEY}'}
        )
        with urllib.request.urlopen(req, timeout=15) as response:
            raw = response.read()
            print(f"  Odgovor: {raw[:100]}")
            data = json.loads(raw)
            courses = data.get('data', [])
            new_count = 0
            for c in courses:
                cid = str(c.get('id', ''))
                if cid and cid not in all_courses:
                    all_courses[cid] = c
                    new_count += 1
            print(f"  {len(courses)} rezultata, {new_count} novih, ukupno: {len(all_courses)}")
    except Exception as e:
        print(f"  GRESKA: {type(e).__name__}: {e}")
    time.sleep(0.5)

result = list(all_courses.values())
result.sort(key=lambda x: (x.get('location', {}).get('country', ''), x.get('club_name', '')))

with open('courses.json', 'w', encoding='utf-8') as f:
    json.dump(result, f, ensure_ascii=False, indent=2)

print(f"\nUkupno {len(result)} terena zapisano u courses.json")
