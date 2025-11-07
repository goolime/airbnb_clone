import { AF, AX, AL, DZ, AS, AD, AO, AI, AG, AR, AM, AW, AU, AT, AZ, BS, BH, BD, BB, BY, BE, BZ, BJ, BM, BT, BO, BA, BW, BV, BR, IO, VG, BN, BG, BF, BI, KH, CM, CA, CV, BQ, KY, CF, TD, CL, CN, CX, CC, CO, KM, CK, CR, HR, CU, CW, CY, CZ, DK, DJ, DM, DO, CD, EC, EG, SV, GQ, ER, EE, SZ, ET, FK, FO, FI, FJ, FR, GF, PF, TF, GA, GM, GE, DE, GH, GI, GR, GL, GD, GP, GU, GT, GG, GN, GW, GY, HT, HM, HN, HK, HU, IS, IN, ID, IR, IQ, IE, IM, IL, IT, CI, JM, JP, JE, JO, KZ, KE, KI, XK, KW, KG, LA, LV, LB, LS, LR, LY, LI, LT, LU, MO, MG, MW, MY, MV, ML, MT, MH, MQ, MR, MU, YT, MX, FM, MD, MC, MN, ME, MS, MA, MZ, MM, NA, NR, NP, NL, NC, NZ, NI, NE, NG, NU, NF, KP, MK, MP, NO, OM, PK, PW, PS, PA, PG, PY, PE, PH, PN, PL, PT, PR, QA, CG, RE, RO, RU, RW, BL, SH, KN, LC, MF, PM, VC, WS, SM, ST, SA, SN, RS, SC, SL, SG, SX, SK, SI, SB, SO, ZA, GS, KR, SS, ES, LK, SD, SR, SJ, SE, CH, SY, TW, TJ, TZ, TH, TL, TG, TK, TO, TT, TN, TR, TM, TC, TV, UG, UA, AE, GB, US, UM, VI, UY, UZ, VU, VA, VE, VN, WF, EH, YE, ZM, ZW } from 'country-flag-icons/react/3x2'
import {useState} from 'react';
import { ChevronDown } from '../util/Icons';

const countryOptions = [
  {
    "name": "Afghanistan",
    "code": "AF",
    "flag": AF
  },
  {
    "name": "Åland Islands",
    "code": "AX",
    "flag": AX
  },
  {
    "name": "Albania",
    "code": "AL",
    "flag": AL
  },
  {
    "name": "Algeria",
    "code": "DZ",
    "flag": DZ
  },
  {
    "name": "American Samoa",
    "code": "AS",
    "flag": AS
  },
  {
    "name": "Andorra",
    "code": "AD",
    "flag": AD
  },
  {
    "name": "Angola",
    "code": "AO",
    "flag": AO
  },
  {
    "name": "Anguilla",
    "code": "AI",
    "flag": AI
  },
  {
    "name": "Antigua and Barbuda",
    "code": "AG",
    "flag": AG
  },
  {
    "name": "Argentina",
    "code": "AR",
    "flag": AR
  },
  {
    "name": "Armenia",
    "code": "AM",
    "flag": AM
  },
  {
    "name": "Aruba",
    "code": "AW",
    "flag": AW
  },
  {
    "name": "Australia",
    "code": "AU",
    "flag": AU
  },
  {
    "name": "Austria",
    "code": "AT",
    "flag": AT
  },
  {
    "name": "Azerbaijan",
    "code": "AZ",
    "flag": AZ
  },
  {
    "name": "Bahamas",
    "code": "BS",
    "flag": BS
  },
  {
    "name": "Bahrain",
    "code": "BH",
    "flag": BH
  },
  {
    "name": "Bangladesh",
    "code": "BD",
    "flag": BD
  },
  {
    "name": "Barbados",
    "code": "BB",
    "flag": BB
  },
  {
    "name": "Belarus",
    "code": "BY",
    "flag": BY
  },
  {
    "name": "Belgium",
    "code": "BE",
    "flag": BE
  },
  {
    "name": "Belize",
    "code": "BZ",
    "flag": BZ
  },
  {
    "name": "Benin",
    "code": "BJ",
    "flag": BJ
  },
  {
    "name": "Bermuda",
    "code": "BM",
    "flag": BM
  },
  {
    "name": "Bhutan",
    "code": "BT",
    "flag": BT
  },
  {
    "name": "Bolivia",
    "code": "BO",
    "flag": BO
  },
  {
    "name": "Bosnia and Herzegovina",
    "code": "BA",
    "flag": BA
  },
  {
    "name": "Botswana",
    "code": "BW",
    "flag": BW
  },
  {
    "name": "Bouvet Island",
    "code": "BV",
    "flag": BV
  },
  {
    "name": "Brazil",
    "code": "BR",
    "flag": BR
  },
  {
    "name": "British Indian Ocean Territory",
    "code": "IO",
    "flag": IO
  },
  {
    "name": "British Virgin Islands",
    "code": "VG",
    "flag": VG
  },
  {
    "name": "Brunei",
    "code": "BN",
    "flag": BN
  },
  {
    "name": "Bulgaria",
    "code": "BG",
    "flag": BG
  },
  {
    "name": "Burkina Faso",
    "code": "BF",
    "flag": BF
  },
  {
    "name": "Burundi",
    "code": "BI",
    "flag": BI
  },
  {
    "name": "Cambodia",
    "code": "KH",
    "flag": KH
  },
  {
    "name": "Cameroon",
    "code": "CM",
    "flag": CM
  },
  {
    "name": "Canada",
    "code": "CA",
    "flag": CA
  },
  {
    "name": "Cape Verde",
    "code": "CV",
    "flag": CV
  },
  {
    "name": "Caribbean Netherlands",
    "code": "BQ",
    "flag": BQ
  },
  {
    "name": "Cayman Islands",
    "code": "KY",
    "flag": KY
  },
  {
    "name": "Central African Republic",
    "code": "CF",
    "flag": CF
  },
  {
    "name": "Chad",
    "code": "TD",
    "flag": TD
  },
  {
    "name": "Chile",
    "code": "CL",
    "flag": CL
  },
  {
    "name": "China",
    "code": "CN",
    "flag": CN
  },
  {
    "name": "Christmas Island",
    "code": "CX",
    "flag": CX
  },
  {
    "name": "Cocos (Keeling) Islands",
    "code": "CC",
    "flag": CC
  },
  {
    "name": "Colombia",
    "code": "CO",
    "flag": CO
  },
  {
    "name": "Comoros",
    "code": "KM",
    "flag": KM
  },
  {
    "name": "Cook Islands",
    "code": "CK",
    "flag": CK
  },
  {
    "name": "Costa Rica",
    "code": "CR",
    "flag": CR
  },
  {
    "name": "Croatia",
    "code": "HR",
    "flag": HR
  },
  {
    "name": "Cuba",
    "code": "CU",
    "flag": CU
  },
  {
    "name": "Curaçao",
    "code": "CW",
    "flag": CW
  },
  {
    "name": "Cyprus",
    "code": "CY",
    "flag": CY
  },
  {
    "name": "Czechia",
    "code": "CZ",
    "flag": CZ
  },
  {
    "name": "Denmark",
    "code": "DK",
    "flag": DK
  },
  {
    "name": "Djibouti",
    "code": "DJ",
    "flag": DJ
  },
  {
    "name": "Dominica",
    "code": "DM",
    "flag": DM
  },
  {
    "name": "Dominican Republic",
    "code": "DO",
    "flag": DO
  },
  {
    "name": "DR Congo",
    "code": "CD",
    "flag": CD
  },
  {
    "name": "Ecuador",
    "code": "EC",
    "flag": EC
  },
  {
    "name": "Egypt",
    "code": "EG",
    "flag": EG
  },
  {
    "name": "El Salvador",
    "code": "SV",
    "flag": SV
  },
  
  {
    "name": "Equatorial Guinea",
    "code": "GQ",
    "flag": GQ
  },
  {
    "name": "Eritrea",
    "code": "ER",
    "flag": ER
  },
  {
    "name": "Estonia",
    "code": "EE",
    "flag": EE
  },
  {
    "name": "Eswatini",
    "code": "SZ",
    "flag": SZ
  },
  {
    "name": "Ethiopia",
    "code": "ET",
    "flag": ET
  },
  {
    "name": "Falkland Islands",
    "code": "FK",
    "flag": FK
  },
  {
    "name": "Faroe Islands",
    "code": "FO",
    "flag": FO
  },
  {
    "name": "Fiji",
    "code": "FJ",
    "flag": FJ
  },
  {
    "name": "Finland",
    "code": "FI",
    "flag": FI
  },
  {
    "name": "France",
    "code": "FR",
    "flag": FR
  },
  {
    "name": "French Guiana",
    "code": "GF",
    "flag": GF
  },
  {
    "name": "French Polynesia",
    "code": "PF",
    "flag": PF
  },
  {
    "name": "French Southern and Antarctic Lands",
    "code": "TF",
    "flag": TF
  },
  {
    "name": "Gabon",
    "code": "GA",
    "flag": GA
  },
  {
    "name": "Gambia",
    "code": "GM",
    "flag": GM
  },
  {
    "name": "Georgia",
    "code": "GE",
    "flag": GE
  },
  {
    "name": "Germany",
    "code": "DE",
    "flag": DE
  },
  {
    "name": "Ghana",
    "code": "GH",
    "flag": GH
  },
  {
    "name": "Gibraltar",
    "code": "GI",
    "flag": GI
  },
  {
    "name": "Greece",
    "code": "GR",
    "flag": GR
  },
  {
    "name": "Greenland",
    "code": "GL",
    "flag": GL
  },
  {
    "name": "Grenada",
    "code": "GD",
    "flag": GD
  },
  {
    "name": "Guadeloupe",
    "code": "GP",
    "flag": GP
  },
  {
    "name": "Guam",
    "code": "GU",
    "flag": GU
  },
  {
    "name": "Guatemala",
    "code": "GT",
    "flag": GT
  },
  {
    "name": "Guernsey",
    "code": "GG",
    "flag": GG
  },
  {
    "name": "Guinea",
    "code": "GN",
    "flag": GN
  },
  {
    "name": "Guinea-Bissau",
    "code": "GW",
    "flag": GW
  },
  {
    "name": "Guyana",
    "code": "GY",
    "flag": GY
  },
  {
    "name": "Haiti",
    "code": "HT",
    "flag": HT
  },
  {
    "name": "Heard Island and McDonald Islands",
    "code": "HM",
    "flag": HM
  },
  {
    "name": "Honduras",
    "code": "HN",
    "flag": HN
  },
  {
    "name": "Hong Kong",
    "code": "HK",
    "flag": HK
  },
  {
    "name": "Hungary",
    "code": "HU",
    "flag": HU
  },
  {
    "name": "Iceland",
    "code": "IS",
    "flag": IS
  },
  {
    "name": "India",
    "code": "IN",
    "flag": IN
  },
  {
    "name": "Indonesia",
    "code": "ID",
    "flag": ID
  },
  {
    "name": "Iran",
    "code": "IR",
    "flag": IR
  },
  {
    "name": "Iraq",
    "code": "IQ",
    "flag": IQ
  },
  {
    "name": "Ireland",
    "code": "IE",
    "flag": IE
  },
  {
    "name": "Isle of Man",
    "code": "IM",
    "flag": IM
  },
  {
    "name": "Israel",
    "code": "IL",
    "flag": IL
  },
  {
    "name": "Italy",
    "code": "IT",
    "flag": IT
  },
  {
    "name": "Ivory Coast",
    "code": "CI",
    "flag": CI
  },
  {
    "name": "Jamaica",
    "code": "JM",
    "flag": JM
  },
  {
    "name": "Japan",
    "code": "JP",
    "flag": JP
  },
  {
    "name": "Jersey",
    "code": "JE",
    "flag": JE
  },
  {
    "name": "Jordan",
    "code": "JO",
    "flag": JO
  },
  {
    "name": "Kazakhstan",
    "code": "KZ",
    "flag": KZ
  },
  {
    "name": "Kenya",
    "code": "KE",
    "flag": KE
  },
  {
    "name": "Kiribati",
    "code": "KI",
    "flag": KI
  },
  {
    "name": "Kosovo",
    "code": "XK",
    "flag": XK
  },
  {
    "name": "Kuwait",
    "code": "KW",
    "flag": KW
  },
  {
    "name": "Kyrgyzstan",
    "code": "KG",
    "flag": KG
  },
  {
    "name": "Laos",
    "code": "LA",
    "flag": LA
  },
  {
    "name": "Latvia",
    "code": "LV",
    "flag": LV
  },
  {
    "name": "Lebanon",
    "code": "LB",
    "flag": LB
  },
  {
    "name": "Lesotho",
    "code": "LS",
    "flag": LS
  },
  {
    "name": "Liberia",
    "code": "LR",
    "flag": LR
  },
  {
    "name": "Libya",
    "code": "LY",
    "flag": LY
  },
  {
    "name": "Liechtenstein",
    "code": "LI",
    "flag": LI
  },
  {
    "name": "Lithuania",
    "code": "LT",
    "flag": LT
  },
  {
    "name": "Luxembourg",
    "code": "LU",
    "flag": LU
  },
  {
    "name": "Macau",
    "code": "MO",
    "flag": MO
  },
  {
    "name": "Madagascar",
    "code": "MG",
    "flag": MG
  },
  {
    "name": "Malawi",
    "code": "MW",
    "flag": MW
  },
  {
    "name": "Malaysia",
    "code": "MY",
    "flag": MY
  },
  {
    "name": "Maldives",
    "code": "MV",
    "flag": MV
  },
  {
    "name": "Mali",
    "code": "ML",
    "flag": ML
  },
  {
    "name": "Malta",
    "code": "MT",
    "flag": MT
  },
  {
    "name": "Marshall Islands",
    "code": "MH",
    "flag": MH
  },
  {
    "name": "Martinique",
    "code": "MQ",
    "flag": MQ
  },
  {
    "name": "Mauritania",
    "code": "MR",
    "flag": MR
  },
  {
    "name": "Mauritius",
    "code": "MU",
    "flag": MU
  },
  {
    "name": "Mayotte",
    "code": "YT",
    "flag": YT
  },
  {
    "name": "Mexico",
    "code": "MX",
    "flag": MX
  },
  {
    "name": "Micronesia",
    "code": "FM",
    "flag": FM
  },
  {
    "name": "Moldova",
    "code": "MD",
    "flag": MD
  },
  {
    "name": "Monaco",
    "code": "MC",
    "flag": MC
  },
  {
    "name": "Mongolia",
    "code": "MN",
    "flag": MN
  },
  {
    "name": "Montenegro",
    "code": "ME",
    "flag": ME
  },
  {
    "name": "Montserrat",
    "code": "MS",
    "flag": MS
  },
  {
    "name": "Morocco",
    "code": "MA",
    "flag": MA
  },
  {
    "name": "Mozambique",
    "code": "MZ",
    "flag": MZ
  },
  {
    "name": "Myanmar",
    "code": "MM",
    "flag": MM
  },
  {
    "name": "Namibia",
    "code": "NA",
    "flag": NA
  },
  {
    "name": "Nauru",
    "code": "NR",
    "flag": NR
  },
  {
    "name": "Nepal",
    "code": "NP",
    "flag": NP
  },
  {
    "name": "Netherlands",
    "code": "NL",
    "flag": NL
  },
  {
    "name": "New Caledonia",
    "code": "NC",
    "flag": NC
  },
  {
    "name": "New Zealand",
    "code": "NZ",
    "flag": NZ
  },
  {
    "name": "Nicaragua",
    "code": "NI",
    "flag": NI
  },
  {
    "name": "Niger",
    "code": "NE",
    "flag": NE
  },
  {
    "name": "Nigeria",
    "code": "NG",
    "flag": NG
  },
  {
    "name": "Niue",
    "code": "NU",
    "flag": NU
  },
  {
    "name": "Norfolk Island",
    "code": "NF",
    "flag": NF
  },
  {
    "name": "North Korea",
    "code": "KP",
    "flag": KP
  },
  {
    "name": "North Macedonia",
    "code": "MK",
    "flag": MK
  },
  {
    "name": "Northern Mariana Islands",
    "code": "MP",
    "flag": MP
  },
  {
    "name": "Norway",
    "code": "NO",
    "flag": NO
  },
  {
    "name": "Oman",
    "code": "OM",
    "flag": OM
  },
  {
    "name": "Pakistan",
    "code": "PK",
    "flag": PK
  },
  {
    "name": "Palau",
    "code": "PW",
    "flag": PW
  },
  {
    "name": "Palestine",
    "code": "PS",
    "flag": PS
  },
  {
    "name": "Panama",
    "code": "PA",
    "flag": PA
  },
  {
    "name": "Papua New Guinea",
    "code": "PG",
    "flag": PG
  },
  {
    "name": "Paraguay",
    "code": "PY",
    "flag": PY
  },
  {
    "name": "Peru",
    "code": "PE",
    "flag": PE
  },
  {
    "name": "Philippines",
    "code": "PH",
    "flag": PH
  },
  {
    "name": "Pitcairn Islands",
    "code": "PN",
    "flag": PN
  },
  {
    "name": "Poland",
    "code": "PL",
    "flag": PL
  },
  {
    "name": "Portugal",
    "code": "PT",
    "flag": PT
  },
  {
    "name": "Puerto Rico",
    "code": "PR",
    "flag": PR
  },
  {
    "name": "Qatar",
    "code": "QA",
    "flag": QA
  },
  {
    "name": "Republic of the Congo",
    "code": "CG",
    "flag": CG
  },
  {
    "name": "R├⌐union",
    "code": "RE",
    "flag": RE
  },
  {
    "name": "Romania",
    "code": "RO",
    "flag": RO
  },
  {
    "name": "Russia",
    "code": "RU",
    "flag": RU
  },
  {
    "name": "Rwanda",
    "code": "RW",
    "flag": RW

  },
  {
    "name": "Saint Barthélemy",
    "code": "BL",
    "flag": BL
  },
  {
    "name": "Saint Helena, Ascension and Tristan da Cunha",
    "code": "SH",
    "flag": SH
  },
  {
    "name": "Saint Kitts and Nevis",
    "code": "KN",
    "flag": KN
  },
  {
    "name": "Saint Lucia",
    "code": "LC",
    "flag": LC
  },
  {
    "name": "Saint Martin",
    "code": "MF",
    "flag": MF
  },
  {
    "name": "Saint Pierre and Miquelon",
    "code": "PM",
    "flag": PM
  },
  {
    "name": "Saint Vincent and the Grenadines",
    "code": "VC",
    "flag": VC
  },
  {
    "name": "Samoa",
    "code": "WS",
    "flag": WS
  },
  {
    "name": "San Marino",
    "code": "SM",
    "flag": SM
  },
  {
    "name": "São Tomé and Príncipe",
    "code": "ST",
    "flag": ST
  },
  {
    "name": "Saudi Arabia",
    "code": "SA",
    "flag": SA
  },
  {
    "name": "Senegal",
    "code": "SN",
    "flag": SN
  },
  {
    "name": "Serbia",
    "code": "RS",
    "flag": RS
  },
  {
    "name": "Seychelles",
    "code": "SC",
    "flag": SC
  },
  {
    "name": "Sierra Leone",
    "code": "SL",
    "flag": SL
  },
  {
    "name": "Singapore",
    "code": "SG",
    "flag": SG
  },
  {
    "name": "Sint Maarten",
    "code": "SX",
    "flag": SX
  },
  {
    "name": "Slovakia",
    "code": "SK",
    "flag": SK
  },
  {
    "name": "Slovenia",
    "code": "SI",
    "flag": SI
  },
  {
    "name": "Solomon Islands",
    "code": "SB",
    "flag": SB
  },
  {
    "name": "Somalia",
    "code": "SO",
    "flag": SO
  },
  {
    "name": "South Africa",
    "code": "ZA",
    "flag": ZA
  },
  {
    "name": "South Georgia",
    "code": "GS",
    "flag": GS
  },
  {
    "name": "South Korea",
    "code": "KR",
    "flag": KR
  },
  {
    "name": "South Sudan",
    "code": "SS",
    "flag": SS
  },
  {
    "name": "Spain",
    "code": "ES",
    "flag": ES
  },
  {
    "name": "Sri Lanka",
    "code": "LK",
    "flag": LK
  },
  {
    "name": "Sudan",
    "code": "SD",
    "flag": SD
  },
  {
    "name": "Suriname",
    "code": "SR",
    "flag": SR
  },
  {
    "name": "Svalbard and Jan Mayen",
    "code": "SJ",
    "flag": SJ
  },
  {
    "name": "Sweden",
    "code": "SE",
    "flag": SE
  },
  {
    "name": "Switzerland",
    "code": "CH",
    "flag": CH
  },
  {
    "name": "Syria",
    "code": "SY",
    "flag": SY
  },
  {
    "name": "Taiwan",
    "code": "TW",
    "flag": TW
  },
  {
    "name": "Tajikistan",
    "code": "TJ",
    "flag": TJ
  },
  {
    "name": "Tanzania",
    "code": "TZ",
    "flag": TZ
  },
  {
    "name": "Thailand",
    "code": "TH",
    "flag": TH
  },
  {
    "name": "Timor-Leste",
    "code": "TL",
    "flag": TL
  },
  {
    "name": "Togo",
    "code": "TG",
    "flag": TG
  },
  {
    "name": "Tokelau",
    "code": "TK",
    "flag": TK
  },
  {
    "name": "Tonga",
    "code": "TO",
    "flag": TO
  },
  {
    "name": "Trinidad and Tobago",
    "code": "TT",
    "flag": TT
  },
  {
    "name": "Tunisia",
    "code": "TN",
    "flag": TN
  },
  {
    "name": "Turkey",
    "code": "TR",
    "flag": TR
  },
  {
    "name": "Turkmenistan",
    "code": "TM",
    "flag": TM
  },
  {
    "name": "Turks and Caicos Islands",
    "code": "TC",
    "flag": TC
  },
  {
    "name": "Tuvalu",
    "code": "TV",
    "flag": TV
  },
  {
    "name": "Uganda",
    "code": "UG",
    "flag": UG
  },
  {
    "name": "Ukraine",
    "code": "UA",
    "flag": UA
  },
  {
    "name": "United Arab Emirates",
    "code": "AE",
    "flag": AE
  },
  {
    "name": "United Kingdom",
    "code": "GB",
    "flag": GB
  },
  {
    "name": "United States",
    "code": "US",
    "flag": US
  },
  {
    "name": "United States Minor Outlying Islands",
    "code": "UM",
    "flag": UM
  },
  {
    "name": "United States Virgin Islands",
    "code": "VI",
    "flag": VI
  },
  {
    "name": "Uruguay",
    "code": "UY",
    "flag": UY
  },
  {
    "name": "Uzbekistan",
    "code": "UZ",
    "flag": UZ
  },
  {
    "name": "Vanuatu",
    "code": "VU",
    "flag": VU
  },
  {
    "name": "Vatican City",
    "code": "VA",
    "flag": VA
  },
  {
    "name": "Venezuela",
    "code": "VE",
    "flag": VE
  },
  {
    "name": "Vietnam",
    "code": "VN",
    "flag": VN
  },
  {
    "name": "Wallis and Futuna",
    "code": "WF",
    "flag": WF
  },
  {
    "name": "Western Sahara",
    "code": "EH",
    "flag": EH
  },
  {
    "name": "Yemen",
    "code": "YE",
    "flag": YE
  },
  {
    "name": "Zambia",
    "code": "ZM",
    "flag": ZM
  },
  {
    "name": "Zimbabwe",
    "code": "ZW",
    "flag": ZW
  }
]


export function ContriesDropdown({ location, onSelect,className, placeholder }) {
  const [isOpen, setIsOpen] = useState(false);
  
  //console.log(location);

  function handleSelect(optionCode, optionName) {
      onSelect({
          country: optionName,
          countryCode: optionCode
      });
      setIsOpen(false);
  }

  const curLocation = countryOptions.find(option => option.code === location.countryCode);  

  return <>
      <button className={`${className} text-start ${curLocation ? 'text-gray-800' : 'text-gray-400'}`} onClick={() => setIsOpen(!isOpen)}>
          <div className="flex flex-row items-center justify-between w-full">
              {curLocation ?  
                <div className='flex flex-row items-center gap-2'><curLocation.flag className="w-4 h-4"/> {curLocation.name} <span className="text-gray-500">{curLocation.code}</span></div> 
                : 
                <div>{placeholder}</div>
              }
              <ChevronDown className="w-4 h-4 inline-block ml-2" />
          </div>
      </button>
      {isOpen && <>
          <div className="relative">
              <ul className="absolute bottom-[-200px] z-10 bg-white h-[200px] border border-gray-300 rounded-lg mt-1 overflow-y-auto">
                  {countryOptions.map(option => (
                      <li key={option.code} onClick={() => handleSelect(option.code, option.name)} className="px-4 py-2 hover:bg-gray-100 flex flex-row items-center gap-2 hover:scale-105 hover:border-gray-800 cursor-pointer">
                          <option.flag className="w-4 h-4"/>
                          {option.name}
                      </li>
                  ))}
              </ul>
          </div>
          <div className='fixed inset-0 z-5' onClick={()=>setIsOpen(false)} />
      </>}
  </>
}
