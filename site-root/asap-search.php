<?php
#sleep(5); // simulate slow connection

// fields from table to return in API
$selectFields = [
    'SiteID',
    'SiteName',
    'SiteProviderName',
    'SiteStreetAddress1',
    'SiteStreetAddress2',
    'SiteCity',
    'SiteState',
    'SiteZip',
    'SiteLat',
    'SiteLong',
    'SiteContactName',
    'SiteContactPhone1'
];




// build WHERE conditions
$where = [];


// add keywords query
if (!empty($_GET['q'])) {
    $where = array_merge($where, ASAPSearch::getKeywordConditions($_GET['q']));
}


// add ASAP clubs filter
if (!empty($_GET['clubs'])) {
    $clubs = is_array($_GET['clubs']) ? $_GET['clubs'] : [$_GET['clubs']];
    $where = array_merge($where, ASAPSearch::getClubConditions($clubs));
}




// add distance calculation / order
if (!empty($_GET['near'])) {
    if (!is_array($_GET['near']) || empty($_GET['near']['lat']) || empty($_GET['near']['lon'])) {
        JSON::error('near must be provided as an array with keys lat and lon');
    }

    if (!is_numeric($_GET['near']['lat']) || !is_numeric($_GET['near']['lon'])) {
        JSON::error('lat and lon must be numeric');
    }

    $selectFields[] = sprintf('ROUND(((ACOS( SIN(%1$f * PI()/180 ) * SIN(SiteLat * PI()/180 ) + COS(%1$f * PI()/180 ) * COS(SiteLat * PI()/180 ) * COS((%2$f - SiteLong) * PI()/180))*180/PI())*60*1.1515),%3$u) AS distance', $_GET['near']['lat'], $_GET['near']['lon'], 2);
    $order = 'distance';
} else {
    $order = 'SiteZip, SiteName';
}


// add grades filter
if (!empty($_GET['grades'])) {
    $validGrades = ['Pre_k', 'K_5', '6_8', '9_12', 'Other'];
    $grades = is_array($_GET['grades']) ? $_GET['grades'] : [$_GET['grades']];

    foreach ($validGrades AS $validGrade) {
        if (in_array($validGrade, $grades)) {
            $where[] = "SiteGrade_$validGrade = 1";
        }
    }
}


// add program hours filter
if (!empty($_GET['hours'])) {
    $validHours = ['BeforeSchool', 'EveningSchool', 'Weekend', 'Overnight', 'SummerProgram'];
    $hours = is_array($_GET['hours']) ? $_GET['hours'] : [$_GET['hours']];

    foreach ($validHours AS $validHour) {
        if (in_array($validHour, $hours)) {
            $where[] = "Site$validHour = 1";
        }
    }
}


// add features filter
if (!empty($_GET['features'])) {
    $validFeatures = ['TransportationProvided'];
    $features = is_array($_GET['features']) ? $_GET['features'] : [$_GET['features']];

    foreach ($validFeatures AS $validFeature) {
        if (in_array($validFeature, $features)) {
            $where[] = "Site$validFeature = 1";
        }
    }
}


// calculate limit params
if (!empty($_GET['limit']) && ctype_digit($_GET['limit'])) {
    $limit = (int)$_GET['limit'];
} else {
    $limit = 25;
}

if (!empty($_GET['offset']) && ctype_digit($_GET['offset'])) {
    $offset = (int)$_GET['offset'];
} else {
    $offset = 0;
}



// execute query and print JSON response
#Debug::dumpVar($_GET, false, 'get');
#Debug::dumpVar($where, true, '$where');
JSON::respond(
    [
        'results' => DB::allRecords(
            'SELECT SQL_CALC_FOUND_ROWS ' . implode(',', $selectFields)
            .' FROM Site'
            .' WHERE SiteApproved = 1 AND (' . (count($where) ? implode(') AND (', $where) : '1') . ')'
            ." ORDER BY $order"
            ." LIMIT $offset, $limit"
        ),
        'limit' => $limit,
        'offset' => $offset,
        'total' => (int)DB::foundRows()
    ]
);