#This is the python file has been used in the first project (interactive land use / population dashboard) to load 
#districts information from Postgres database.
######################################################
# Generate district statistics (population and landuse)
#######################################################
# import libraries and modules
#######################################################
import os
import json
import psycopg2
from psycopg2.extras import RealDictCursor
import cgi

 
print ("Content-type: application/json")
print ()

# reading the city name parameter through using cgi library
params = cgi.FieldStorage()
cityName = params.getvalue('cityname')
if cityName is None:
    cityName = 'Enschede'
 
# opening the credentials file in the folder
file = open(os.path.dirname(os.path.abspath(__file__)) + "\pg.credentials")

# connecting the the sql database using credentials file and its credential information
connection_string = file.readline() + file.readline()
pg = psycopg2.connect(connection_string)
 
records_query = pg.cursor(cursor_factory=RealDictCursor)
records_query.execute("""
    WITH cp AS (
        SELECT d.wk_code AS code, 'g' || generate_series(1,9) AS group,
               substring(d.wk_code from 7 for 2) AS label,
               regexp_replace(d.wk_name, 'Wijk (.. )', '') AS name,
               d.aant_inw::REAL AS pop_2016,    
               st_area(d.geom) / 1000000 AS area_km2
        FROM  netherlands.district as d
         WHERE d.gm_naam = '%s'
        ORDER BY 1,2
    )
    SELECT cp.code, cp.label, cp.name, cp.pop_2016, cp.area_km2,
           json_agg((
               cp.group,
               round(l.use_m2::NUMERIC,2),
               round((l.use_m2 * 100 / (cp.area_km2 * 1000000))::NUMERIC,2)
           )) AS landuse_2012
    FROM cp LEFT JOIN s2326965.landuse_haarlem as l 
         ON (l.wk_code = cp.code) AND ('g' || l.group_2012 = cp.group)
    GROUP BY 1,2,3,4,5;
""" % (cityName))
 
# putting the results of the query in a json file
results = json.dumps(records_query.fetchall())
# replacing f1, f2, and f3 in the json file with corresponding values
results = results.replace('"f1"','"group"').replace('"f2"','"m2"').replace('"f3"','"pct"')
print ('{"success":"true", "districts":',results,'}')