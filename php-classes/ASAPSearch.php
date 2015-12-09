<?php

class ASAPSearch
{
    public static $escapeFn = ['DB', 'escape'];

    // valid values for clubs[] filter
    public static $validClubs = ['ASAPChess', 'ASAPDebate', 'ASAPDrama', 'ASAPScrabble'];

    // Map of binary ASAP columns to search term substrings that should trigger them
    public static $booleanKeywords = [
        'SiteASAPChess' => ['chess'],
        'SiteASAPDebate' => ['debate'],
        'SiteASAPDrama' => ['drama'],
        'SiteASAPScrabble' => ['scrabble'],

        'Games' => ['game'],
        'TutoringHomeworkHelp' => ['tutor', 'homework'],

        'Sports' => ['sport'],
        'Baseball' => ['sport', 'baseball'],
        'Basketball' => ['sport', 'basketball'],
        'Soccer' => ['sport', 'soccer'],
        'Football' => ['sport', 'football'],
        'TrackAndField' => ['sport', 'track', 'field'],
        'Soccer' => ['sport', 'soccer'],
        'Swimming' => ['sport', 'swim', 'water'],
        'Tennis' => ['sport', 'tennis'],
        'IceHockey' => ['sport', 'hockey'],

        'Fitness' => ['fitness'],
        'MartialArts' => ['martial arts'],

        'NutritionHealthyLiving' => ['nutrition', 'health'],
        'Counseling' => ['counseling'],
        'SelfHelp' => ['self help'],
        'SpecialNeeds' => ['special needs'],
        'Music' => ['music'],
        'PerformingArts' => ['perform'],
        'ArtsCrafts' => ['art', 'craft'],
        'VisualArts' => ['art', 'visual'],
        'Fashion' => ['fashion'],
        'OutdoorActivities' => ['outdoor'],
        'HorticulturalEnvironmental' => ['horticulture', 'environment'],
        'CommunityService' => ['community', 'service'],
        'EthnicCultural' => ['ethnic', 'cultur'],
        'DayCareChildCare' => ['care'],
        'HomeSkillsLifeSkills' => ['home', 'life', 'school'],
        'Language' => ['language'],
        'Writing' => ['writ'],
        'Communications' => ['communicat'],
        'CareerTraining' => ['career', 'train'],
        'VocationalTechnicalTraining' => ['train', 'vocation', 'technical'],
        'ComputerTraining' => ['train', 'computer', 'programming', 'graphic', 'design', 'web'],
        'ComputerProgramming' => ['computer', 'programming', 'graphic', 'design', 'web'],
        'GraphicDesign' => ['computer', 'programming', 'graphic', 'design', 'web'],
        'WebDevelopment' => ['computer', 'programming', 'graphic', 'design', 'web'],
        'FieldTrips' => ['field'],
        'ProjectBasedLearning' => ['project', 'learn'],
        'SchoolCreditRecovery' => ['credit', 'recovery'],
        'STEM' => ['stem', 'steam', 'science', 'technology', 'engineer', 'math'],
        'CulinaryArts' => ['culinary', 'cook', 'chef']
    ];

    public static function getKeywordConditions($query)
    {
        $where = [];

        // lowercase, split, trim, and filter query string into array of terms
        $searchTerms = array_filter(array_map('trim', preg_split('/[\s,]/', strtolower($query))));

        // each search term generates a bunch of OR-joined conditions to check mapped boolean columns or string column substrings
        foreach ($searchTerms AS $term) {
            $termConditions = [];
            $escapedTerm = call_user_func(static::$escapeFn, $term);

            // boolean checks first cause they're faster
            foreach (static::$booleanKeywords AS $column => $keywords) {
                foreach ($keywords AS $keyword) {
                    if (strpos($term, $keyword) !== false) {
                        $termConditions[] = "$column = 1";
                    }
                }
            }

            // substring checks next
            $termConditions[] = "SiteName LIKE '%$escapedTerm%'";
            $termConditions[] = "SiteProviderName LIKE '%$escapedTerm%'";
            $termConditions[] = "SiteType LIKE '%$escapedTerm%'";
            $termConditions[] = "SiteStreetAddress1 LIKE '%$escapedTerm%'";
            $termConditions[] = "SiteStreetAddress2 LIKE '%$escapedTerm%'";
            $termConditions[] = "SiteZip LIKE '%$escapedTerm%'";
            $termConditions[] = "OtherSiteActivities LIKE '%$escapedTerm%'";

            $where[] = implode(' OR ', $termConditions);
        }

        return $where;
    }

    public static function getClubConditions(array $clubs)
    {
        $where = [];

        foreach (static::$validClubs AS $column) {
            if (in_array($column, $clubs)) {
                $where[] = "Site$column = 1";
            }
        }

        return $where;
    }
}