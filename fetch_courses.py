#!/usr/bin/env python3
# fetch_courses.py — preuzima sve golf terene u Europi

import urllib.request
import urllib.parse
import json
import os
import time

API_KEY = os.environ.get('GOLF_API_KEY', '')
BASE_URL = 'https://api.golfcourseapi.com/v1/search?search_query='

# Sve europske države + ključni gradovi
QUERIES = [
    # Njemačka — NRW fokus
    'Düsseldorf', 'Neuss', 'Krefeld', 'Mönchengladbach', 'Köln',
    'Bonn', 'Dortmund', 'Essen', 'Bochum', 'Duisburg', 'Wuppertal',
    'Aachen', 'Münster', 'Bielefeld', 'Paderborn', 'Siegen',
    'München', 'Berlin', 'Hamburg', 'Frankfurt', 'Stuttgart',
    'Leipzig', 'Dresden', 'Nürnberg', 'Hannover', 'Bremen',
    # Austrija
    'Wien', 'Salzburg', 'Graz', 'Innsbruck', 'Linz',
    # Švicarska
    'Zürich', 'Genf', 'Basel', 'Bern',
    # Nizozemska
    'Amsterdam', 'Rotterdam', 'Den Haag', 'Utrecht', 'Eindhoven',
    # Belgija
    'Brüssel', 'Antwerpen', 'Gent', 'Brügge',
    # Luksemburg
    'Luxembourg',
    # Francuska
    'Paris', 'Lyon', 'Marseille', 'Bordeaux', 'Nice', 'Strasbourg',
    # Španjolska
    'Madrid', 'Barcelona', 'Sevilla', 'Valencia', 'Malaga', 'Marbella',
    # Portugal
    'Lissabon', 'Porto', 'Algarve', 'Cascais',
    # Italija
    'Rom', 'Mailand', 'Florenz', 'Venedig', 'Turin', 'Bologna',
    # UK
    'London', 'Edinburgh', 'Glasgow', 'Manchester', 'Birmingham',
    'St Andrews', 'Dublin',
    # Irska
    'Cork', 'Galway',
    # Skandinavija
    'Stockholm', 'Göteborg', 'Oslo', 'Bergen', 'Kopenhagen',
    'Helsinki', 'Tampere',
    # Polska
    'Warschau', 'Krakau', 'Wroclaw', 'Gdansk',
    # Češka
    'Prag', 'Brno',
    # Mađarska
    'Budapest',
    # Hrvatska
    'Zagreb', 'Split', 'Dubrovnik',
    # Slovenija
    'Ljubljana',
    # Grčka
    'Athen', 'Thessaloniki', 'Rhodos', 'Kreta',
    # Turska (europski dio)
    'Istanbul',
    # Generalni upiti
    'golf club Germany', 'golf club Austria', 'golf club Switzerland',
    'golf club Netherlands', 'golf club Belgium', 'golf club France',
    'golf club Spain', 'golf club Italy', 'golf club England',
    'golf club Scotland', 'golf club Ireland', 'golf club Portugal',
    'golf club Sweden', 'golf club Norway', 'golf club Denmark',
    'golf club Finland', 'golf club Poland', 'golf club Croatia',
]

all_courses = {}
total_queries = len(QUERIES)

for i, query in enumerate(QUERIES):
    try:
        url = BASE_URL + urllib.parse.quote(query)
        req = urllib.request.Request(
            url,
            headers={'Authorization': f'Key {API_KEY}'}
        )
        with urllib.request.urlopen(req, timeout=15) as response:
            data = json.loads(response.read())
            courses = data.get('data', [])
            new_count = 0
            for c in courses:
                cid = str(c.get('id', ''))
                if cid and cid not in all_courses:
                    all_courses[cid] = c
                    new_count += 1
            print(f"[{i+1}/{total_queries}] '{query}': {len(courses)} rezultata, {new_count} novih (ukupno: {len(all_courses)})")
    except Exception as e:
        print(f"[{i+1}/{total_queries}] Greška za '{query}': {e}")

    time.sleep(0.5)  # Pauza da ne preopteretimo API

result = list(all_courses.values())
result.sort(key=lambda x: (x.get('location', {}).get('country', ''), x.get('club_name', '')))

with open('courses.json', 'w', encoding='utf-8') as f:
    json.dump(result, f, ensure_ascii=False, indent=2)

print(f"\n✓ Ukupno {len(result)} europskih golf terena → courses.json")
