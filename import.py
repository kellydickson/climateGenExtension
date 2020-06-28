import json
import urllib.request
from pprint import pprint

websource = urllib.request.urlopen('http://www.masslottery.com/data/json/games/lottery/recent.json')
data = json.loads(websource.read().decode())
pprint(data)