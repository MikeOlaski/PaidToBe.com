
-- Create countries table
CREATE TABLE IF NOT EXISTS public.countries (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    flag TEXT,
    region TEXT,
    population TEXT,
    gdp_per_capita NUMERIC,
    political_system TEXT,
    readiness_score NUMERIC,
    ubi_status TEXT,
    safety_net_strength NUMERIC,
    healthcare_score NUMERIC,
    visa_accessibility NUMERIC,
    policy_momentum NUMERIC,
    economic_capacity NUMERIC,
    political_will NUMERIC,
    expat_accessibility NUMERIC,
    workforce_vulnerability NUMERIC,
    top_industries JSONB,
    cost_of_living TEXT,
    dual_citizenship BOOLEAN,
    key_policies JSONB,
    summary TEXT,
    visa_types JSONB,
    tax_implications TEXT,
    petition_links JSONB,
    policy_timeline JSONB,
    cost_of_living_index NUMERIC,
    annual_cash_transfer NUMERIC,
    annual_cash_transfer_local TEXT,
    cost_of_thriving_index NUMERIC,
    average_annual_income NUMERIC,
    thriving_target NUMERIC,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.countries ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access to countries" 
ON public.countries FOR SELECT 
USING (true);

-- Insert seed data
INSERT INTO public.countries (
    id, name, flag, region, population, gdp_per_capita, political_system, 
    readiness_score, ubi_status, safety_net_strength, healthcare_score, 
    visa_accessibility, policy_momentum, economic_capacity, political_will, 
    expat_accessibility, workforce_vulnerability, top_industries, cost_of_living, 
    dual_citizenship, key_policies, summary, visa_types, tax_implications, 
    petition_links, policy_timeline, cost_of_living_index, annual_cash_transfer, 
    annual_cash_transfer_local, cost_of_thriving_index, average_annual_income, thriving_target
) VALUES
(
        'finland', 'Finland', '🇫🇮', 'Europe', '5.5M', 
        53983, 'Parliamentary Republic', 9.2, 'Active Pilot', 
        9.5, 9.3, 7, 8.5, 
        8.8, 8, 7.2, 5.5, 
        '["Technology","Forestry","Manufacturing"]'::jsonb, 'High', true, '["UBI pilot (2017-2018) €560/mo","Comprehensive social insurance","Free education through university"]'::jsonb, 
        'Finland conducted the world''s most notable UBI experiment from 2017-2018, providing €560/month to 2,000 unemployed citizens. Results showed improved wellbeing and modest employment effects. The country maintains one of the world''s strongest social safety nets with universal healthcare, free education, and generous unemployment benefits.', '["EU Blue Card","Startup Permit","Specialist Permit"]'::jsonb, 'Progressive income tax 6-57%. Tax treaties with 80+ countries.', '[]'::jsonb, 
        '[{"year":2015,"title":"UBI Experiment Proposed","description":"Government announced plans for a basic income experiment","type":"proposal"},{"year":2017,"title":"UBI Pilot Launched","description":"2,000 unemployed Finns received €560/month unconditionally","type":"pilot"},{"year":2018,"title":"Pilot Concluded","description":"Two-year experiment ended; results showed improved wellbeing","type":"outcome"},{"year":2023,"title":"Social Security Reform","description":"Major overhaul of social security system consolidating benefits","type":"legislation"}]'::jsonb, 77.3, 8064, '€7,440/yr (€620/mo social assistance)', 
        3.5, 48000, 231900
    ),
(
        'denmark', 'Denmark', '🇩🇰', 'Europe', '5.9M', 
        67803, 'Constitutional Monarchy', 9, 'Exploring', 
        9.4, 9, 6.5, 7.8, 
        9.2, 7.5, 6.8, 5, 
        '["Pharmaceuticals","Renewable Energy","Shipping"]'::jsonb, 'Very High', true, '["Flexicurity model","Universal healthcare","Free education","Generous unemployment (90% of salary)"]'::jsonb, 
        'Denmark''s ''flexicurity'' model combines flexible labor markets with strong social security. While no formal UBI pilot exists, the country''s comprehensive welfare state effectively provides a high baseline standard of living for all residents. Unemployment benefits can reach 90% of previous salary.', '["EU/EEA Free Movement","Work Permit","Startup Denmark"]'::jsonb, 'Progressive tax up to 55.9%. Extensive tax treaty network.', '[]'::jsonb, 
        '[{"year":2020,"title":"Green Transition Plan","description":"70% emissions reduction target with just transition provisions","type":"legislation"},{"year":2022,"title":"AI Strategy Update","description":"National AI strategy includes workforce transition planning","type":"proposal"}]'::jsonb, 83, 26400, 'DKK 19,728/mo unemployment (max)', 
        10.6, 58000, 249000
    ),
(
        'sweden', 'Sweden', '🇸🇪', 'Europe', '10.4M', 
        55689, 'Constitutional Monarchy', 8.8, 'Exploring', 
        9.2, 8.8, 6.8, 7.5, 
        9, 7.2, 7, 5.2, 
        '["Technology","Automotive","Pharmaceuticals"]'::jsonb, 'High', true, '["Universal welfare state","Active labor market policies","Parental leave (480 days)","80% income replacement unemployment"]'::jsonb, 
        'Sweden combines a robust welfare state with a dynamic tech economy. Strong emphasis on retraining and active labor market policies positions it well for AI-driven workforce transitions. Unemployment insurance replaces 80% of income.', '["EU/EEA Free Movement","Work Permit","Self-Employment Permit"]'::jsonb, 'Income tax 30-57%. Wealth tax abolished in 2007.', '[]'::jsonb, 
        '[{"year":2021,"title":"AI Commission Report","description":"National commission on AI''s impact on labor markets","type":"proposal"},{"year":2024,"title":"Digital Transition Fund","description":"SEK 5 billion allocated for workforce reskilling","type":"legislation"}]'::jsonb, 72.5, 18000, 'SEK 15,510/mo unemployment insurance (max)', 
        8.3, 52000, 217500
    ),
(
        'norway', 'Norway', '🇳🇴', 'Europe', '5.4M', 
        82832, 'Constitutional Monarchy', 8.7, 'Exploring', 
        9.3, 9.1, 5.5, 7, 
        9.5, 7, 5.8, 4.5, 
        '["Oil & Gas","Shipping","Seafood","Technology"]'::jsonb, 'Very High', true, '["Government Pension Fund ($1.7T)","Universal healthcare","Generous parental leave","62.4% income unemployment benefit"]'::jsonb, 
        'Norway''s sovereign wealth fund ($1.7 trillion, world''s largest) gives it unmatched economic capacity to fund universal high income programs. Strong existing welfare provisions and low inequality make it a top candidate for post-labor economy leadership.', '["EEA Residence","Skilled Worker Permit","Startup Visa"]'::jsonb, 'Progressive tax 22-46%. Oil revenue provides fiscal cushion.', '[]'::jsonb, 
        '[{"year":2020,"title":"AI Strategy Launched","description":"National strategy for AI including workforce impact assessment","type":"proposal"},{"year":2023,"title":"Wealth Fund Debate","description":"Parliamentary debate on using sovereign fund for UBI-type programs","type":"proposal"},{"year":2025,"title":"Post-Labor Economy Commission","description":"Cross-party commission examining AI impact on Norwegian labor market","type":"proposal"}]'::jsonb, 92, 28000, 'NOK 304,000/yr unemployment (max)', 
        10.1, 65000, 276000
    ),
(
        'netherlands', 'Netherlands', '🇳🇱', 'Europe', '17.6M', 
        57101, 'Constitutional Monarchy', 8.3, 'Active Pilot', 
        8.5, 8.7, 7.5, 8, 
        8.8, 7.5, 8, 5.8, 
        '["Technology","Agriculture","Finance","Logistics"]'::jsonb, 'High', false, '["Municipal UBI experiments","30% ruling for expats","Universal healthcare","Trust-based welfare trials"]'::jsonb, 
        'Several Dutch cities have conducted basic income experiments using trust-based welfare models. The ''30% ruling'' tax benefit for skilled migrants makes it especially attractive for expats. Strong institutions and progressive policy culture support innovation in social policy.', '["EU/EEA Free Movement","Highly Skilled Migrant","Startup Visa","DAFT (US citizens)"]'::jsonb, 'Progressive tax up to 49.5%. 30% ruling reduces taxable income for qualifying expats.', '[]'::jsonb, 
        '[{"year":2017,"title":"Municipal Basic Income Trials","description":"Utrecht, Tilburg and other cities launched trust-based welfare experiments","type":"pilot"},{"year":2023,"title":"AI & Labor Report","description":"Government advisory report on AI impact on Dutch labor market","type":"proposal"},{"year":2025,"title":"Expanded Trust Welfare","description":"More municipalities adopting trust-based unconditional welfare","type":"pilot"}]'::jsonb, 73.5, 14400, '€1,200/mo social assistance (single)', 
        6.5, 54000, 220500
    ),
(
        'canada', 'Canada', '🇨🇦', 'Americas', '39.6M', 
        52722, 'Federal Parliamentary Democracy', 7.8, 'Proposed', 
        7.5, 7.8, 7.5, 7.5, 
        8.2, 7, 8, 5.5, 
        '["Natural Resources","Technology","Finance","Manufacturing"]'::jsonb, 'High', true, '["Ontario Basic Income Pilot (cancelled)","CERB pandemic payments","Universal healthcare","Canada Child Benefit"]'::jsonb, 
        'Canada''s Ontario province ran a basic income pilot (cancelled in 2018 by new government). The CERB pandemic payments ($2,000/mo) demonstrated capacity for universal cash transfers. The Canada Child Benefit provides up to CAD 7,787 per child. Strong immigration pathways make it accessible for expats.', '["Express Entry","Provincial Nominee","Startup Visa","Working Holiday"]'::jsonb, 'Federal + provincial tax. Tax treaties with 90+ countries.', '[]'::jsonb, 
        '[{"year":2017,"title":"Ontario Basic Income Pilot","description":"4,000 participants received up to CAD 16,989/year","type":"pilot"},{"year":2018,"title":"Pilot Cancelled","description":"New Ontario government cancelled the pilot prematurely","type":"outcome"},{"year":2020,"title":"CERB Launched","description":"CAD 2,000/month emergency payments to millions during COVID","type":"legislation"},{"year":2024,"title":"Senate UBI Report","description":"Senate committee recommended exploring guaranteed basic income","type":"proposal"}]'::jsonb, 67.5, 9360, 'CAD 12,816/yr (Ontario Works single)', 
        4.6, 48000, 202500
    ),
(
        'germany', 'Germany', '🇩🇪', 'Europe', '84.5M', 
        51384, 'Federal Parliamentary Republic', 7.6, 'Active Pilot', 
        8.2, 8.5, 7, 7, 
        8.5, 6.5, 7.5, 6.5, 
        '["Automotive","Engineering","Chemicals","Technology"]'::jsonb, 'Moderate-High', true, '["Pilotprojekt Grundeinkommen €1,200/mo","Bürgergeld reform €563/mo","Universal healthcare"]'::jsonb, 
        'Germany launched a privately-funded UBI study in 2021 giving 122 people €1,200/month for 3 years. The 2023 Bürgergeld reform replaced Hartz IV with €563/mo. Europe''s largest economy has significant capacity for post-labor transition, though political will is moderate.', '["EU Blue Card","Job Seeker Visa","Freelance Visa","Startup Visa"]'::jsonb, 'Progressive tax 14-45% plus solidarity surcharge. Many tax treaties.', '[]'::jsonb, 
        '[{"year":2021,"title":"UBI Study Launched","description":"3-year study with 122 participants receiving €1,200/month","type":"pilot"},{"year":2023,"title":"Bürgergeld Reform","description":"Replaced Hartz IV with €563/mo, less punitive welfare","type":"legislation"},{"year":2025,"title":"AI Labor Impact Report","description":"Federal report on AI displacement in manufacturing sector","type":"proposal"}]'::jsonb, 65.5, 6756, '€563/mo Bürgergeld', 
        3.4, 50000, 196500
    ),
(
        'south-korea', 'South Korea', '🇰🇷', 'Asia-Pacific', '51.7M', 
        34998, 'Presidential Republic', 7.5, 'Active Pilot', 
        6.5, 8, 5.5, 8.5, 
        8, 7.5, 5.5, 6.8, 
        '["Electronics","Automotive","Shipbuilding","K-content"]'::jsonb, 'Moderate-High', false, '["Rural Basic Income pilots (7 counties)","Gyeonggi Youth Basic Income","National AI Strategy","150,000 KRW/mo rural UBI"]'::jsonb, 
        'South Korea dramatically expanded basic income in 2025 with rural basic income pilots in 7 counties providing 150,000 KRW/month to all residents. Gyeonggi Province pioneered youth basic income. The country''s advanced digital infrastructure makes it a key player in post-labor planning.', '["E-7 Skilled Worker","D-8 Investor","F-2 Long-term Resident"]'::jsonb, 'Progressive tax 6-45%. Tax treaties with 90+ countries.', '[]'::jsonb, 
        '[{"year":2019,"title":"Gyeonggi Youth Basic Income","description":"Quarterly payments of 250,000 KRW to 24-year-olds","type":"pilot"},{"year":2022,"title":"Presidential UBI Debate","description":"UBI was central campaign issue in presidential election","type":"proposal"},{"year":2025,"title":"Rural Basic Income Expansion","description":"7 counties launched 150,000 KRW/mo to all residents","type":"pilot"}]'::jsonb, 67, 1380, '₩150,000/mo rural UBI pilot', 
        0.7, 35000, 201000
    ),
(
        'uae', 'United Arab Emirates', '🇦🇪', 'Middle East', '9.4M', 
        49451, 'Federal Absolute Monarchy', 7.2, 'None', 
        6, 7.5, 8.5, 7.5, 
        9, 7, 9, 4, 
        '["Oil & Gas","Tourism","Finance","Real Estate"]'::jsonb, 'High', false, '["Golden Visa program","No income tax","Citizens'' welfare programs","AI Ministry (world''s first)"]'::jsonb, 
        'UAE has the world''s first Minister of AI and aggressive diversification plans. Citizens receive generous state benefits including housing grants, marriage grants, and subsidies. The Golden Visa and zero income tax make it highly attractive for global talent.', '["Golden Visa (10yr)","Green Visa (5yr)","Freelance Visa","Retirement Visa"]'::jsonb, 'No personal income tax. 9% corporate tax (2023). No capital gains tax.', '[]'::jsonb, 
        '[{"year":2017,"title":"AI Ministry Created","description":"World''s first Minister of State for Artificial Intelligence","type":"legislation"},{"year":2019,"title":"Golden Visa Launched","description":"10-year residence visa for investors, entrepreneurs, specialists","type":"legislation"}]'::jsonb, 55, 0, 'Citizens-only benefits (housing, marriage grants)', 
        0, 45000, 165000
    ),
(
        'singapore', 'Singapore', '🇸🇬', 'Asia-Pacific', '5.9M', 
        72794, 'Parliamentary Republic', 7.8, 'None', 
        6.5, 9, 7, 8, 
        9.5, 7, 7.5, 5, 
        '["Finance","Technology","Biomedical","Logistics"]'::jsonb, 'Very High', false, '["SkillsFuture program","Workfare Income Supplement","National AI Strategy 2.0","CPF system"]'::jsonb, 
        'Singapore''s technocratic approach emphasizes skills-based support over universal transfers. The SkillsFuture program and National AI Strategy 2.0 position it well for workforce transition. The CPF system and Workfare supplement provide targeted support.', '["Employment Pass","EntrePass","ONE Pass (top talent)"]'::jsonb, 'Progressive tax 0-22%. No capital gains tax. Favorable tax treaties.', '[]'::jsonb, 
        '[{"year":2019,"title":"National AI Strategy","description":"Comprehensive plan for AI adoption across economy","type":"legislation"},{"year":2023,"title":"National AI Strategy 2.0","description":"Updated strategy with focus on workforce displacement","type":"legislation"}]'::jsonb, 81, 4800, 'SGD 400/mo Workfare Income Supplement (max)', 
        2, 60000, 243000
    ),
(
        'spain', 'Spain', '🇪🇸', 'Europe', '47.4M', 
        30116, 'Constitutional Monarchy', 6.8, 'Active Pilot', 
        7, 8.2, 8, 7.5, 
        6.5, 7, 8.5, 7, 
        '["Tourism","Automotive","Agriculture","Renewable Energy"]'::jsonb, 'Moderate', true, '["Ingreso Mínimo Vital €604/mo","Digital Nomad Visa","Universal healthcare","Catalonia UBI pilot"]'::jsonb, 
        'Spain launched the Ingreso Mínimo Vital in 2020, providing up to €604/month. Catalonia is designing a full UBI pilot. The Digital Nomad Visa and affordable cost of living make it increasingly popular with location-independent workers.', '["EU Free Movement","Digital Nomad Visa","Non-Lucrative Visa","Golden Visa"]'::jsonb, 'Progressive tax 19-47%. Beckham Law offers flat 24% for qualifying expats.', '[]'::jsonb, 
        '[{"year":2020,"title":"Ingreso Mínimo Vital","description":"National minimum income guarantee up to €604/month","type":"legislation"},{"year":2023,"title":"Digital Nomad Visa","description":"New visa category for remote workers from outside EU","type":"legislation"},{"year":2024,"title":"Catalonia UBI Pilot Design","description":"Catalonia designing full UBI pilot for 5,000 participants","type":"proposal"}]'::jsonb, 53, 7248, '€604/mo Ingreso Mínimo Vital (max)', 
        4.6, 28000, 159000
    ),
(
        'portugal', 'Portugal', '🇵🇹', 'Europe', '10.3M', 
        24568, 'Semi-Presidential Republic', 6.5, 'Exploring', 
        6.8, 7.5, 8.5, 6.5, 
        5.8, 6, 9, 6.5, 
        '["Tourism","Technology","Textiles","Renewable Energy"]'::jsonb, 'Moderate', true, '["NHR tax regime (reformed)","D7 Passive Income Visa","Free public healthcare","Social Insertion Income"]'::jsonb, 
        'Portugal''s combination of affordable living, favorable tax regimes, and welcoming visa policies has made it a top destination for digital nomads and early retirees. The Social Insertion Income (RSI) provides a safety net, and EU membership provides solid foundation.', '["D7 Passive Income","Digital Nomad Visa","Golden Visa (reformed)","EU Free Movement"]'::jsonb, 'NHR regime offered flat 20% (reformed 2024). Standard progressive 14.5-48%.', '[]'::jsonb, 
        '[{"year":2022,"title":"Digital Nomad Visa","description":"New visa for remote workers earning 4x minimum wage","type":"legislation"},{"year":2024,"title":"NHR Reform","description":"Non-Habitual Resident tax regime reformed/replaced","type":"legislation"}]'::jsonb, 46, 2640, '€220/mo RSI (Social Insertion Income)', 
        1.9, 22000, 138000
    ),
(
        'switzerland', 'Switzerland', '🇨🇭', 'Europe', '8.8M', 
        93457, 'Federal Republic (Direct Democracy)', 7, 'Proposed', 
        8.5, 9, 4.5, 5.5, 
        9.8, 5, 4.5, 4.5, 
        '["Finance","Pharmaceuticals","Watchmaking","Technology"]'::jsonb, 'Very High', true, '["2016 UBI referendum (CHF 2,500/mo proposed)","Comprehensive social insurance","Direct democracy"]'::jsonb, 
        'Switzerland held the world''s first national referendum on UBI in 2016, proposing CHF 2,500/month (~$2,800). Though rejected 77-23%, it catalyzed global UBI discourse. Direct democracy means future proposals can be brought by citizens.', '["EU/EFTA Permit","L/B/C Permits","Investor Permit"]'::jsonb, 'Federal + cantonal taxes vary widely. Some cantons very favorable.', '[]'::jsonb, 
        '[{"year":2016,"title":"UBI Referendum","description":"World''s first national vote on UBI (CHF 2,500/mo); rejected 77-23%","type":"outcome"},{"year":2024,"title":"AI Regulation Discussion","description":"Federal Council assessing need for AI-specific regulation","type":"proposal"}]'::jsonb, 101, 0, 'CHF 2,500/mo proposed (not enacted)', 
        0, 85000, 303000
    ),
(
        'japan', 'Japan', '🇯🇵', 'Asia-Pacific', '125.1M', 
        39243, 'Constitutional Monarchy', 6.5, 'Proposed', 
        7, 9, 5.5, 6.5, 
        7.5, 5.5, 5, 6, 
        '["Automotive","Electronics","Robotics","Gaming"]'::jsonb, 'High', false, '["Society 5.0 initiative","Demographic crisis response","Universal healthcare","Seikatsu Hogo welfare"]'::jsonb, 
        'Japan''s aging population creates unique conditions for post-labor transition. Society 5.0 envisions AI-integrated society. Some politicians have proposed UBI as demographic crisis solution. Advanced robotics provides testbed for automation policy.', '["Highly Skilled Professional","Business Manager","Startup Visa"]'::jsonb, 'Progressive tax 5-45% plus local taxes. Tax treaties with 70+ countries.', '[]'::jsonb, 
        '[{"year":2016,"title":"Society 5.0","description":"Government vision for ''super smart society'' integrating AI","type":"proposal"},{"year":2022,"title":"UBI Discussion","description":"Several politicians proposed UBI pilot programs","type":"proposal"}]'::jsonb, 60, 3600, '¥45,000/mo Seikatsu Hogo welfare', 
        2, 38000, 180000
    ),
(
        'new-zealand', 'New Zealand', '🇳🇿', 'Oceania', '5.1M', 
        48249, 'Constitutional Monarchy', 7, 'Proposed', 
        7.5, 7.8, 6.5, 6.5, 
        7, 6.5, 6.5, 5.5, 
        '["Agriculture","Tourism","Technology","Film Production"]'::jsonb, 'High', true, '["Wellbeing Budget","ACC no-fault system","Universal superannuation NZD 498/wk"]'::jsonb, 
        'New Zealand''s pioneering ''Wellbeing Budget'' measures success beyond GDP. Universal superannuation provides NZD 498/week to all over-65s. Progressive leadership and small government enable rapid policy innovation.', '["Skilled Migrant","Entrepreneur Visa","Global Impact Visa","Working Holiday"]'::jsonb, 'Progressive tax 10.5-39%. No capital gains tax (mostly).', '[]'::jsonb, 
        '[{"year":2019,"title":"Wellbeing Budget","description":"World''s first national budget prioritizing wellbeing metrics","type":"legislation"},{"year":2023,"title":"AI Forum Report","description":"Industry forum report on AI''s impact on NZ employment","type":"proposal"}]'::jsonb, 68, 16380, 'NZD 498/wk NZ Super (over 65)', 
        8, 42000, 204000
    ),
(
        'united-states', 'United States', '🇺🇸', 'Americas', '331.9M', 
        76399, 'Federal Presidential Republic', 5.5, 'Active Pilot', 
        5, 5.5, 5, 6.5, 
        9.5, 4, 5, 6.5, 
        '["Technology","Finance","Healthcare","Energy"]'::jsonb, 'High (varies widely)', true, '["50+ city UBI pilots","Alaska PFD $1,312/yr","SNAP/Medicaid/SSI","Sam Altman UBI advocacy"]'::jsonb, 
        'The US has the most active landscape of local UBI pilots (50+ cities). Alaska''s Permanent Fund paid $1,312 in 2024. Andrew Yang and Sam Altman have mainstreamed UBI/UHI discourse. Enormous economic capacity but deeply fragmented political will.', '["H-1B","O-1 Extraordinary Ability","EB-5 Investor","E-2 Treaty Investor"]'::jsonb, 'Federal + state tax. Worldwide taxation for citizens. FATCA reporting.', '[]'::jsonb, 
        '[{"year":1982,"title":"Alaska Permanent Fund","description":"Annual dividend to all Alaska residents from oil revenues","type":"legislation"},{"year":2019,"title":"Stockton SEED","description":"125 residents received $500/month for 24 months","type":"pilot"},{"year":2020,"title":"Yang UBI Campaign","description":"Presidential campaign proposing $1,000/month Freedom Dividend","type":"proposal"},{"year":2024,"title":"50+ City Pilots","description":"Guaranteed income pilots active across 50+ US cities","type":"pilot"},{"year":2025,"title":"AI & UHI Debate","description":"Sam Altman and tech leaders push Universal High Income concept","type":"proposal"}]'::jsonb, 71, 6000, '$500/mo typical city pilot; $1,312/yr Alaska PFD', 
        2.8, 60000, 213000
    ),
(
        'united-kingdom', 'United Kingdom', '🇬🇧', 'Europe', '67.7M', 
        46125, 'Constitutional Monarchy', 6.2, 'Proposed', 
        6.5, 7, 5.5, 6, 
        7.8, 5, 6, 6.2, 
        '["Finance","Technology","Creative Industries","Pharma"]'::jsonb, 'High', true, '["NHS","Universal Credit £393/mo","Welsh UBI pilot £1,600/mo care leavers","Scottish feasibility studies"]'::jsonb, 
        'Wales conducted a UBI pilot giving care leavers £1,600/month. Scotland explored UBI feasibility studies. Universal Credit provides £393/month baseline. Strong think-tank ecosystem producing UBI research.', '["Skilled Worker","Global Talent","Innovator Founder","High Potential Individual"]'::jsonb, 'Progressive tax 20-45%. Non-dom status reformed.', '[]'::jsonb, 
        '[{"year":2022,"title":"Welsh UBI Pilot","description":"£1,600/month to care leavers across Wales","type":"pilot"},{"year":2023,"title":"Scottish Feasibility Study","description":"Four local authorities studied UBI feasibility","type":"proposal"}]'::jsonb, 67, 4716, '£393/mo Universal Credit (single, over 25)', 
        2.3, 42000, 201000
    ),
(
        'ireland', 'Ireland', '🇮🇪', 'Europe', '5.1M', 
        100172, 'Parliamentary Republic', 7, 'Active Pilot', 
        7.5, 7, 7, 7, 
        8.5, 6.5, 7, 5.5, 
        '["Technology","Pharmaceuticals","Finance","Agriculture"]'::jsonb, 'High', true, '["Basic Income for Arts €325/wk","Sláintecare","Tech hub incentives","Jobseeker''s Allowance €232/wk"]'::jsonb, 
        'Ireland launched a Basic Income for the Arts pilot in 2022, giving €325/week to 2,000 artists for 3 years. As EU HQ for Google, Meta, Apple, Ireland is directly exposed to AI disruption but economically well-positioned.', '["EU Free Movement","Critical Skills Permit","Startup Entrepreneur Programme"]'::jsonb, 'Progressive tax 20-40%. 12.5% corporate tax. Artist''s tax exemption.', '[]'::jsonb, 
        '[{"year":2022,"title":"Basic Income for Arts","description":"€325/week to 2,000 artists for 3 years","type":"pilot"},{"year":2023,"title":"AI Advisory Council","description":"Government AI advisory body established","type":"legislation"}]'::jsonb, 73, 16900, '€325/wk Basic Income for Arts', 
        7.7, 50000, 219000
    ),
(
        'brazil', 'Brazil', '🇧🇷', 'Americas', '215.3M', 
        8918, 'Federal Presidential Republic', 5, 'Proposed', 
        5.5, 5, 7, 6, 
        4.5, 5.5, 7.5, 7, 
        '["Agriculture","Mining","Manufacturing","Technology"]'::jsonb, 'Low-Moderate', true, '["UBI law on books (Lei 10.835/2004)","Bolsa Família R$600/mo","SUS universal healthcare","Maricá municipal UBI"]'::jsonb, 
        'Brazil has a UBI law since 2004 (never fully implemented) and Bolsa Família reaching 21 million families at R$600/month. Maricá municipality runs an active UBI for 42,000 residents. The legal framework for full UBI already exists.', '["Digital Nomad Visa","Investor Visa","Retirement Visa","MERCOSUR agreement"]'::jsonb, 'Progressive tax 7.5-27.5%. Worldwide income taxation.', '[]'::jsonb, 
        '[{"year":2004,"title":"UBI Law Signed","description":"Lei 10.835 established legal framework for citizen''s basic income","type":"legislation"},{"year":2023,"title":"Bolsa Família Expanded","description":"R$600/month to 21 million families under Lula","type":"legislation"},{"year":2025,"title":"Maricá UBI Active","description":"Municipal UBI reaching 42,000 residents","type":"pilot"}]'::jsonb, 33, 1440, 'R$600/mo Bolsa Família', 
        1.5, 8000, 99000
    ),
(
        'india', 'India', '🇮🇳', 'Asia-Pacific', '1.44B', 
        2389, 'Federal Parliamentary Republic', 4.5, 'Proposed', 
        4, 4, 6, 6, 
        4, 5.5, 5.5, 7.5, 
        '["IT Services","Pharmaceuticals","Agriculture","Manufacturing"]'::jsonb, 'Low', false, '["PM-KISAN ₹6,000/yr to 110M farmers","Jan Dhan financial inclusion","Aadhaar digital ID","UPI payments infrastructure"]'::jsonb, 
        'India''s PM-KISAN provides direct cash to 110 million farmer families. The UPI/Aadhaar digital infrastructure handles 12 billion transactions/month — the technical foundation for universal transfers at scale exists. Economic capacity is the main constraint.', '["Employment Visa","Business Visa","OCI Card (diaspora)"]'::jsonb, 'Progressive tax 5-30% plus surcharges.', '[]'::jsonb, 
        '[{"year":2017,"title":"Economic Survey UBI Chapter","description":"Government''s Economic Survey devoted full chapter to UBI","type":"proposal"},{"year":2019,"title":"PM-KISAN Launched","description":"₹6,000/year direct transfer to 110M farmer families","type":"legislation"}]'::jsonb, 21, 72, '₹6,000/yr PM-KISAN', 
        0.1, 2400, 63000
    ),
(
        'kenya', 'Kenya', '🇰🇪', 'Africa', '54.0M', 
        2099, 'Presidential Republic', 4, 'Active Pilot', 
        3, 3.5, 7.5, 6, 
        2.5, 4.5, 7, 6, 
        '["Agriculture","Tourism","Technology","Finance"]'::jsonb, 'Low', true, '["GiveDirectly 12-year UBI (world''s largest)","M-Pesa mobile money","Universal healthcare push"]'::jsonb, 
        'Kenya hosts the world''s largest and longest UBI experiment: GiveDirectly provides payments to 20,000+ people for 12 years. M-Pesa demonstrates how mobile payments enable universal transfers in developing contexts.', '["Digital Nomad Permit","Work Permit","Investor Permit"]'::jsonb, 'Progressive tax 10-30%. Digital services tax 1.5%.', '[]'::jsonb, 
        '[{"year":2017,"title":"GiveDirectly Mega-Experiment","description":"12-year UBI experiment launched, 20,000+ participants","type":"pilot"},{"year":2022,"title":"Results Published","description":"Early results show significant wellbeing and enterprise improvements","type":"outcome"}]'::jsonb, 26, 264, '$22/mo GiveDirectly UBI', 
        0.3, 2000, 78000
    ),
(
        'australia', 'Australia', '🇦🇺', 'Oceania', '26.0M', 
        65099, 'Federal Parliamentary Democracy', 6.5, 'Proposed', 
        7, 8, 6, 5.5, 
        8.5, 4.5, 6.5, 5.5, 
        '["Mining","Finance","Technology","Agriculture"]'::jsonb, 'High', true, '["Medicare universal healthcare","JobSeeker AUD 762/fortnight","Superannuation 11.5%","Greens UBI policy"]'::jsonb, 
        'Australia''s compulsory superannuation (11.5%) and Medicare provide strong foundations. JobSeeker pays AUD 762/fortnight. The Greens adopted UBI as official policy. COVID-era JobKeeper demonstrated universal payment capacity.', '["Skilled Independent (189)","Employer Sponsored (482)","Global Talent (858)"]'::jsonb, 'Progressive tax 19-45%. No inheritance tax.', '[]'::jsonb, 
        '[{"year":2020,"title":"JobKeeper/JobSeeker Boost","description":"Pandemic payments doubled welfare, reaching millions","type":"legislation"},{"year":2023,"title":"Green Party UBI Policy","description":"Australian Greens adopted UBI as official policy platform","type":"proposal"}]'::jsonb, 73, 10140, 'AUD 762/fortnight JobSeeker', 
        4.6, 55000, 219000
    ),
(
        'estonia', 'Estonia', '🇪🇪', 'Europe', '1.3M', 
        27283, 'Parliamentary Republic', 7.2, 'Exploring', 
        6.5, 7, 8, 7.5, 
        6, 7, 8.5, 5, 
        '["Technology","E-governance","Cybersecurity","Fintech"]'::jsonb, 'Moderate', true, '["E-Residency program","Digital-first governance","Flat tax 20%","0% corporate tax on reinvestment"]'::jsonb, 
        'Estonia''s e-Residency program and digital governance are unmatched. Infrastructure for rapid deployment of universal digital payments exists. The first country to offer digital residency to non-citizens globally.', '["EU Free Movement","E-Residency","Digital Nomad Visa","Startup Visa"]'::jsonb, '20% flat income tax. 0% corporate tax on reinvested profits.', '[]'::jsonb, 
        '[{"year":2014,"title":"E-Residency Launched","description":"World''s first digital residency program","type":"legislation"},{"year":2022,"title":"AI & Automation Strategy","description":"National strategy for AI integration in public services","type":"proposal"}]'::jsonb, 49, 2400, '€200/mo subsistence benefit', 
        1.6, 25000, 147000
    ),
(
        'marshall-islands', 'Marshall Islands', '🇲🇭', 'Oceania', '42K', 
        6200, 'Presidential Republic', 6, 'Active Pilot', 
        3.5, 4, 6, 9, 
        2, 9, 5, 4, 
        '["Fishing","Copra","Tourism","US Military Base"]'::jsonb, 'Moderate', true, '["World''s first national crypto UBI (2025)","SOV digital currency","US Compact of Free Association"]'::jsonb, 
        'In December 2025, the Marshall Islands became the first nation to launch a universal basic income paid in cryptocurrency to all citizens. While small in scale, it represents a pioneering model for blockchain-based universal payments that could scale globally.', '["US Compact of Free Association","Tourist Visa"]'::jsonb, 'Income tax 8-12%. No capital gains tax.', '[]'::jsonb, 
        '[{"year":2018,"title":"SOV Digital Currency","description":"Sovereign digital currency declared legal tender","type":"legislation"},{"year":2025,"title":"Crypto UBI Launched","description":"World''s first national UBI scheme paid in cryptocurrency","type":"pilot"}]'::jsonb, 45, 600, '$50/mo crypto UBI (estimated)', 
        0.4, 4500, 135000
    ),
(
        'costa-rica', 'Costa Rica', '🇨🇷', 'Americas', '5.2M', 
        12509, 'Presidential Republic', 5.5, 'Exploring', 
        6.5, 7.5, 8, 5.5, 
        4.5, 6, 8.5, 6, 
        '["Tourism","Technology","Medical Devices","Agriculture"]'::jsonb, 'Moderate', true, '["Universal healthcare (CCSS)","Free education","Digital Nomad Visa","Pura Vida philosophy"]'::jsonb, 
        'Costa Rica punches above its weight with universal healthcare, free education, and quality of life rivaling wealthier nations. Digital Nomad Visa and welcoming expat culture make it a top destination.', '["Digital Nomad Visa","Rentista Visa","Pensionado Visa","Investor Visa"]'::jsonb, 'Territorial tax system — only Costa Rica-sourced income taxed.', '[]'::jsonb, 
        '[{"year":2021,"title":"Digital Nomad Visa","description":"One-year visa for remote workers earning $3,000+/month","type":"legislation"}]'::jsonb, 42, 960, '₡40,000/mo Avancemos (youth)', 
        0.8, 10000, 126000
    ),
(
        'uruguay', 'Uruguay', '🇺🇾', 'Americas', '3.4M', 
        20795, 'Presidential Republic', 5.8, 'Exploring', 
        7, 7, 7.5, 5, 
        5.5, 6, 8, 5.5, 
        '["Agriculture","Technology","Tourism","Renewable Energy"]'::jsonb, 'Moderate', true, '["Comprehensive social protection","Tax holiday for newcomers (11yr)","Plan Ceibal digital education"]'::jsonb, 
        'Uruguay offers strong democratic institutions, comprehensive social protections, and welcoming immigration. Tax holiday for newcomers (11 years) and easy residency make it attractive for globally mobile individuals.', '["Temporary Residence","Permanent Residence","MERCOSUR agreement"]'::jsonb, 'Territorial tax transitioning to worldwide. 11-year tax holiday for newcomers.', '[]'::jsonb, 
        '[{"year":2020,"title":"Social Protection Expansion","description":"Emergency social spending doubled during pandemic","type":"legislation"}]'::jsonb, 40, 1200, 'UYU 4,500/mo social assistance', 
        1, 15000, 120000
    ),
(
        'taiwan', 'Taiwan', '🇹🇼', 'Asia-Pacific', '23.6M', 
        32756, 'Semi-Presidential Republic', 6.8, 'Proposed', 
        7, 8.5, 6, 6.5, 
        7.5, 5.5, 6, 6, 
        '["Semiconductors","Electronics","Technology","Manufacturing"]'::jsonb, 'Moderate', true, '["National Health Insurance","Consumption voucher programs NT$6,000","AI action plan","Employment Gold Card"]'::jsonb, 
        'Taiwan''s world-class semiconductor industry and digital governance position it uniquely. Universal voucher programs (NT$6,000 in 2023) demonstrate capacity for universal transfers. Outstanding healthcare at low cost.', '["Employment Gold Card","Work Permit","Entrepreneur Visa"]'::jsonb, 'Progressive tax 5-40%. Gold Card holders get tax benefits.', '[]'::jsonb, 
        '[{"year":2020,"title":"Triple Stimulus Vouchers","description":"Universal voucher program boosting consumption post-COVID","type":"legislation"},{"year":2023,"title":"NT$6,000 Universal Payment","description":"All citizens received NT$6,000 cash/voucher","type":"legislation"}]'::jsonb, 48, 200, 'NT$6,000 one-time (2023)', 
        0.1, 28000, 144000
    ),
(
        'iceland', 'Iceland', '🇮🇸', 'Europe', '376K', 
        73466, 'Parliamentary Republic', 7.5, 'Exploring', 
        8.5, 8.8, 5.5, 7, 
        8, 7.5, 5.5, 4.5, 
        '["Tourism","Fishing","Renewable Energy","Technology"]'::jsonb, 'Very High', true, '["4-day work week (86% of workforce)","Universal healthcare","Strong unions","Generous parental leave"]'::jsonb, 
        'Iceland''s 4-day work week trials were so successful that 86% of the workforce now has access to shorter hours. Strong social safety net, universal healthcare, and progressive labor policies. Small, cohesive society enables rapid experimentation.', '["EEA Free Movement","Work Permit","Long-term Visa"]'::jsonb, 'Progressive tax 31.5-46.25%. No wealth tax.', '[]'::jsonb, 
        '[{"year":2021,"title":"4-Day Work Week Success","description":"Trials showed productivity maintained; 86% now have access","type":"outcome"},{"year":2023,"title":"AI Policy Framework","description":"Government framework for responsible AI adoption","type":"proposal"}]'::jsonb, 93, 18000, 'ISK 250,000/mo financial assistance', 
        6.5, 60000, 279000
    );
