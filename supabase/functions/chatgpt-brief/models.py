"""
Pydantic models for structured output from ChatGPT brief generation.
These models enforce valid values for all multiselect options.
"""
from enum import Enum
from typing import List, Optional
from pydantic import BaseModel, Field, field_validator


# Enum definitions for valid values
class Platform(str, Enum):
    INSTAGRAM = "instagram"
    TIKTOK = "tiktok"
    YOUTUBE = "youtube"
    LINKEDIN = "linkedin"
    TWITTER = "twitter"
    TWITCH = "twitch"
    RED = "red"
    FACEBOOK = "facebook"
    WECHAT = "wechat"
    DOUYIN = "douyin"


class Category(str, Enum):
    BEAUTY_COSMETICS = "beauty-cosmetics"
    FASHION_LUXURY = "fashion-luxury"
    LIFESTYLE = "lifestyle"
    HEALTH_WELLNESS = "health-wellness"
    FITNESS_SPORTS = "fitness-sports"
    NUTRITION_DIET = "nutrition-diet"
    MENTAL_HEALTH = "mental-health"
    PARENTING_FAMILY = "parenting-family"
    RELATIONSHIPS_DATING = "relationships-dating"
    SELF_IMPROVEMENT_MOTIVATION = "self-improvement-motivation"
    GAMING = "gaming"
    MOVIES_TV = "movies-tv"
    MUSIC = "music"
    ART_DESIGN = "art-design"
    PHOTOGRAPHY = "photography"
    BOOKS_LITERATURE = "books-literature"
    POP_CULTURE = "pop-culture"
    CELEBRITIES_INFLUENCERS = "celebrities-influencers"
    TRAVEL = "travel"
    ADVENTURE_OUTDOORS = "adventure-outdoors"
    HOSPITALITY_TOURISM = "hospitality-tourism"
    SUSTAINABLE_TRAVEL = "sustainable-travel"
    TECH_GADGETS = "tech-gadgets"
    AI_INNOVATION = "ai-innovation"
    SCIENCE_EDUCATION = "science-education"
    AUTOMOTIVE = "automotive"
    CRYPTOCURRENCY_BLOCKCHAIN = "cryptocurrency-blockchain"
    FINANCE_INVESTING = "finance-investing"
    STARTUPS_ENTREPRENEURSHIP = "startups-entrepreneurship"
    FOOD_BEVERAGE = "food-beverage"
    COOKING_RECIPES = "cooking-recipes"
    WINE_BEER_SPIRITS = "wine-beer-spirits"
    RESTAURANTS_DINING = "restaurants-dining"
    VEGAN_PLANT_BASED_LIVING = "vegan-plant-based-living"
    HOME_DECOR_INTERIOR_DESIGN = "home-decor-interior-design"
    DIY_CRAFTS = "diy-crafts"
    GARDENING = "gardening"
    PETS_ANIMALS = "pets-animals"
    REAL_ESTATE = "real-estate"
    SUSTAINABILITY_ENVIRONMENT = "sustainability-environment"
    CHARITY_SOCIAL_CAUSES = "charity-social-causes"
    POLITICS_ACTIVISM = "politics-activism"
    EDUCATION_LEARNING = "education-learning"
    CAREER_PRODUCTIVITY = "career-productivity"
    MARKETING_ADVERTISING = "marketing-advertising"
    ECOMMERCE_RETAIL = "ecommerce-retail"
    EVENTS_CONFERENCES = "events-conferences"
    LUXURY_LIFESTYLE = "luxury-lifestyle"
    WEDDINGS_EVENTS = "weddings-events"
    SPIRITUALITY_MINDFULNESS = "spirituality-mindfulness"
    MENS_LIFESTYLE = "mens-lifestyle"
    WOMENS_LIFESTYLE = "womens-lifestyle"
    YOUTH_STUDENT_LIFE = "youth-student-life"
    OTHER = "other"


class CountryCode(str, Enum):
    """ISO 3166-1 alpha-2 country codes"""
    AF = "AF"  # Afghanistan
    AL = "AL"  # Albania
    DZ = "DZ"  # Algeria
    AD = "AD"  # Andorra
    AO = "AO"  # Angola
    AG = "AG"  # Antigua and Barbuda
    AR = "AR"  # Argentina
    AM = "AM"  # Armenia
    AU = "AU"  # Australia
    AT = "AT"  # Austria
    AZ = "AZ"  # Azerbaijan
    BS = "BS"  # Bahamas
    BH = "BH"  # Bahrain
    BD = "BD"  # Bangladesh
    BB = "BB"  # Barbados
    BY = "BY"  # Belarus
    BE = "BE"  # Belgium
    BZ = "BZ"  # Belize
    BJ = "BJ"  # Benin
    BT = "BT"  # Bhutan
    BO = "BO"  # Bolivia
    BA = "BA"  # Bosnia and Herzegovina
    BW = "BW"  # Botswana
    BR = "BR"  # Brazil
    BN = "BN"  # Brunei
    BG = "BG"  # Bulgaria
    BF = "BF"  # Burkina Faso
    BI = "BI"  # Burundi
    CV = "CV"  # Cabo Verde
    KH = "KH"  # Cambodia
    CM = "CM"  # Cameroon
    CA = "CA"  # Canada
    CF = "CF"  # Central African Republic
    TD = "TD"  # Chad
    CL = "CL"  # Chile
    CN = "CN"  # China
    CO = "CO"  # Colombia
    KM = "KM"  # Comoros
    CG = "CG"  # Congo
    CR = "CR"  # Costa Rica
    HR = "HR"  # Croatia
    CU = "CU"  # Cuba
    CY = "CY"  # Cyprus
    CZ = "CZ"  # Czech Republic
    DK = "DK"  # Denmark
    DJ = "DJ"  # Djibouti
    DM = "DM"  # Dominica
    DO = "DO"  # Dominican Republic
    EC = "EC"  # Ecuador
    EG = "EG"  # Egypt
    SV = "SV"  # El Salvador
    GQ = "GQ"  # Equatorial Guinea
    ER = "ER"  # Eritrea
    EE = "EE"  # Estonia
    SZ = "SZ"  # Eswatini
    ET = "ET"  # Ethiopia
    FJ = "FJ"  # Fiji
    FI = "FI"  # Finland
    FR = "FR"  # France
    GA = "GA"  # Gabon
    GM = "GM"  # Gambia
    GE = "GE"  # Georgia
    DE = "DE"  # Germany
    GH = "GH"  # Ghana
    GR = "GR"  # Greece
    GD = "GD"  # Grenada
    GT = "GT"  # Guatemala
    GN = "GN"  # Guinea
    GW = "GW"  # Guinea-Bissau
    GY = "GY"  # Guyana
    HT = "HT"  # Haiti
    HN = "HN"  # Honduras
    HU = "HU"  # Hungary
    IS = "IS"  # Iceland
    IN = "IN"  # India
    ID = "ID"  # Indonesia
    IR = "IR"  # Iran
    IQ = "IQ"  # Iraq
    IE = "IE"  # Ireland
    IL = "IL"  # Israel
    IT = "IT"  # Italy
    JM = "JM"  # Jamaica
    JP = "JP"  # Japan
    JO = "JO"  # Jordan
    KZ = "KZ"  # Kazakhstan
    KE = "KE"  # Kenya
    KI = "KI"  # Kiribati
    XK = "XK"  # Kosovo
    KW = "KW"  # Kuwait
    KG = "KG"  # Kyrgyzstan
    LA = "LA"  # Laos
    LV = "LV"  # Latvia
    LB = "LB"  # Lebanon
    LS = "LS"  # Lesotho
    LR = "LR"  # Liberia
    LY = "LY"  # Libya
    LI = "LI"  # Liechtenstein
    LT = "LT"  # Lithuania
    LU = "LU"  # Luxembourg
    MG = "MG"  # Madagascar
    MW = "MW"  # Malawi
    MY = "MY"  # Malaysia
    MV = "MV"  # Maldives
    ML = "ML"  # Mali
    MT = "MT"  # Malta
    MH = "MH"  # Marshall Islands
    MR = "MR"  # Mauritania
    MU = "MU"  # Mauritius
    MX = "MX"  # Mexico
    FM = "FM"  # Micronesia
    MD = "MD"  # Moldova
    MC = "MC"  # Monaco
    MN = "MN"  # Mongolia
    ME = "ME"  # Montenegro
    MA = "MA"  # Morocco
    MZ = "MZ"  # Mozambique
    MM = "MM"  # Myanmar
    NA = "NA"  # Namibia
    NR = "NR"  # Nauru
    NP = "NP"  # Nepal
    NL = "NL"  # Netherlands
    NZ = "NZ"  # New Zealand
    NI = "NI"  # Nicaragua
    NE = "NE"  # Niger
    NG = "NG"  # Nigeria
    KP = "KP"  # North Korea
    MK = "MK"  # North Macedonia
    NO = "NO"  # Norway
    OM = "OM"  # Oman
    PK = "PK"  # Pakistan
    PW = "PW"  # Palau
    PS = "PS"  # Palestine
    PA = "PA"  # Panama
    PG = "PG"  # Papua New Guinea
    PY = "PY"  # Paraguay
    PE = "PE"  # Peru
    PH = "PH"  # Philippines
    PL = "PL"  # Poland
    PT = "PT"  # Portugal
    QA = "QA"  # Qatar
    RO = "RO"  # Romania
    RU = "RU"  # Russia
    RW = "RW"  # Rwanda
    KN = "KN"  # Saint Kitts and Nevis
    LC = "LC"  # Saint Lucia
    VC = "VC"  # Saint Vincent and the Grenadines
    WS = "WS"  # Samoa
    SM = "SM"  # San Marino
    ST = "ST"  # Sao Tome and Principe
    SA = "SA"  # Saudi Arabia
    SN = "SN"  # Senegal
    RS = "RS"  # Serbia
    SC = "SC"  # Seychelles
    SL = "SL"  # Sierra Leone
    SG = "SG"  # Singapore
    SK = "SK"  # Slovakia
    SI = "SI"  # Slovenia
    SB = "SB"  # Solomon Islands
    SO = "SO"  # Somalia
    ZA = "ZA"  # South Africa
    KR = "KR"  # South Korea
    SS = "SS"  # South Sudan
    ES = "ES"  # Spain
    LK = "LK"  # Sri Lanka
    SD = "SD"  # Sudan
    SR = "SR"  # Suriname
    SE = "SE"  # Sweden
    CH = "CH"  # Switzerland
    SY = "SY"  # Syria
    TW = "TW"  # Taiwan
    TJ = "TJ"  # Tajikistan
    TZ = "TZ"  # Tanzania
    TH = "TH"  # Thailand
    TL = "TL"  # Timor-Leste
    TG = "TG"  # Togo
    TO = "TO"  # Tonga
    TT = "TT"  # Trinidad and Tobago
    TN = "TN"  # Tunisia
    TR = "TR"  # Turkey
    TM = "TM"  # Turkmenistan
    TV = "TV"  # Tuvalu
    UG = "UG"  # Uganda
    UA = "UA"  # Ukraine
    AE = "AE"  # United Arab Emirates
    GB = "GB"  # United Kingdom
    US = "US"  # United States
    UY = "UY"  # Uruguay
    UZ = "UZ"  # Uzbekistan
    VU = "VU"  # Vanuatu
    VA = "VA"  # Vatican City
    VE = "VE"  # Venezuela
    VN = "VN"  # Vietnam
    YE = "YE"  # Yemen
    ZM = "ZM"  # Zambia
    ZW = "ZW"  # Zimbabwe


class AudienceSize(str, Enum):
    KOC = "koc"
    NANO = "nano"
    MICRO = "micro"
    MID_TIER = "mid-tier"


class Gender(str, Enum):
    MALE = "male"
    FEMALE = "female"
    OTHER = "other"


class ContentFormat(str, Enum):
    VIDEO = "video"
    REELS = "reels"
    PHOTOS = "photos"
    LIVE_STREAMS = "live-streams"
    BLOG = "blog"
    PODCAST = "podcast"


class BriefDetails(BaseModel):
    """Brief details section"""
    projectName: str = Field(..., description="A concise, descriptive project name")
    brandBrief: str = Field(..., description="The full brand brief content")
    briefSummary: str = Field(..., description="A brief summary of the project")
    questions: List[str] = Field(
        ...,
        min_length=5,
        max_length=5,
        description="List of exactly 5 key questions to be asked to influencers"
    )


class InfluencerSelection(BaseModel):
    """Influencer selection criteria"""
    numberOfInfluencers: int = Field(
        ...,
        ge=10,
        le=500,
        description="Number of influencers to target (10-500)"
    )
    platforms: List[Platform] = Field(
        default_factory=list,
        description="List of preferred platforms"
    )
    categories: List[Category] = Field(
        default_factory=list,
        description="List of relevant categories/niches"
    )
    regions: List[CountryCode] = Field(
        default_factory=list,
        description="List of target countries (ISO 3166-1 alpha-2 codes)"
    )
    audienceSize: Optional[AudienceSize] = Field(
        None,
        description="Target audience size tier"
    )
    gender: List[Gender] = Field(
        default_factory=list,
        description="Target gender demographics"
    )
    contentFormat: List[ContentFormat] = Field(
        default_factory=list,
        description="Preferred content formats"
    )
    previousCollaborations: List[str] = Field(
        default_factory=list,
        description="List of previous collaborations or mentioned products"
    )
    additionalNotes: Optional[str] = Field(
        None,
        description="Additional notes or custom requirements"
    )


class BriefResponse(BaseModel):
    """Complete brief response structure"""
    brief: BriefDetails
    selection: InfluencerSelection

    @field_validator('selection')
    @classmethod
    def validate_selection(cls, v: InfluencerSelection) -> InfluencerSelection:
        """Ensure at least one selection criteria is provided"""
        if (
            not v.platforms
            and not v.categories
            and not v.regions
            and not v.audienceSize
            and not v.gender
            and not v.contentFormat
        ):
            raise ValueError(
                "At least one selection criteria (platforms, categories, regions, "
                "audienceSize, gender, or contentFormat) must be provided"
            )
        return v

