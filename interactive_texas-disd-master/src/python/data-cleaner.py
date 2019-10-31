import csv
import json
import re

scores = []
locations = []

cleaned_data = {
    "type": "FeatureCollection",
    "name": "final_clean-tea",
    "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
    "features": []
}

with open('../data/raw/2019_school_scores_0903.csv') as scores_file:
    scores = [{k: v for k, v in row.items()}
        for row in csv.DictReader(scores_file, skipinitialspace=True)]


with open('../data/raw/2019_school_locations_0903.csv') as locations_file:
    locations = [{k: v for k, v in row.items()}
        for row in csv.DictReader(locations_file, skipinitialspace=True)]

with open('../data/raw/2019_hs_grad_data_0903.csv') as grad_file:
    grads = [{k: v for k, v in row.items()}
        for row in csv.DictReader(grad_file, skipinitialspace=True)]




for score in scores:
    school_id= score['CAMPUS']
    target_location = list(filter(lambda location: location['School_Num'] == school_id, locations))
    target_grads = list(filter(lambda grad: grad['TEA ID'] == school_id, grads))

    cleaned_school = {
        'type': 'Feature',
        'properties': {},
        'geometry': {
            'type': 'Point',
            'coordinates': []
        }
    }

    cleaned_school['properties'] = score

    school_name = cleaned_school['properties']['CAMPNAME']

    if school_name.find(' H S') > -1:
        cleaned_name = re.sub(' H S', ' HIGH', school_name)
        cleaned_school['properties']['CAMPNAME'] = cleaned_name

    if school_name[-3:] == ' EL':
        cleaned_name = re.sub(' EL$', ' ELEMENTARY', school_name)
        cleaned_school['properties']['CAMPNAME'] = cleaned_name

    if school_name[-7:] == ' MIDDLE':
        cleaned_name = re.sub(' MIDDLE$', ' MIDDLE', school_name)
        cleaned_school['properties']['CAMPNAME'] = cleaned_name

    cleaned_school['properties']['ADDRESS'] = target_location[0]['Match_addr']
    if len((target_location[0]['longitude'])) > 0:
        cleaned_school['geometry']['coordinates'].append(float(target_location[0]['longitude']))
    else:
        cleaned_school['geometry']['coordinates'].append(float(target_location[0]['X']))

    if len((target_location[0]['latitude'])) > 0:
        cleaned_school['geometry']['coordinates'].append(float(target_location[0]['latitude']))
    else:
        cleaned_school['geometry']['coordinates'].append(float(target_location[0]['Y']))

    if len(target_grads) > 0:
        cleaned_school['properties']['col_cred'] = target_grads[0]['2018_col_cred']
        cleaned_school['properties']['col_cred_per'] = target_grads[0]['2018_col_cred_perc']
        cleaned_school['properties']['ind_cert'] = target_grads[0]['2018_ind_cert']
        cleaned_school['properties']['ind_cert_per'] = target_grads[0]['2018_ind_cert_perc']
        cleaned_school['properties']['assoc_deg'] = target_grads[0]['2018_assoc_deg']
        cleaned_school['properties']['assoc_deg_per'] = target_grads[0]['2018_assoc_deg_per']
        cleaned_school['properties']['milt_enl'] = target_grads[0]['2018_milt_enl']
        cleaned_school['properties']['milt_enl_per'] = target_grads[0]['2018_milt_enl_perc']


    cleaned_school['properties']['searchable_name'] = school_name + ', ' + target_location[0]['City']
    print(cleaned_school['properties']['searchable_name'])
    
    cleaned_data['features'].append(cleaned_school)


print(cleaned_data['features'][10])
with open('../data/cleaned/schools.geojson', 'w') as geojson_file:
    json.dump(cleaned_data, geojson_file)
