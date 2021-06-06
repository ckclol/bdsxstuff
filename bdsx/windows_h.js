"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LONG = exports.DWORD = exports.WORD = exports.BYTE = exports.CHAR = exports.MEM_FREE = exports.MEM_RELEASE = exports.MEM_DECOMMIT = exports.MEM_PRESERVE_PLACEHOLDER = exports.MEM_COALESCE_PLACEHOLDERS = exports.MEM_UNMAP_WITH_TRANSIENT_BOOST = exports.MEM_64K_PAGES = exports.MEM_4MB_PAGES = exports.MEM_LARGE_PAGES = exports.MEM_RESET_UNDO = exports.MEM_DIFFERENT_IMAGE_BASE_OK = exports.MEM_ROTATE = exports.MEM_PHYSICAL = exports.MEM_WRITE_WATCH = exports.MEM_TOP_DOWN = exports.MEM_RESET = exports.MEM_RESERVE_PLACEHOLDER = exports.MEM_REPLACE_PLACEHOLDER = exports.MEM_RESERVE = exports.MEM_COMMIT = exports.PAGE_ENCLAVE_DECOMMIT = exports.PAGE_ENCLAVE_UNVALIDATED = exports.PAGE_TARGETS_INVALID = exports.PAGE_TARGETS_NO_UPDATE = exports.PAGE_REVERT_TO_FILE_MAP = exports.PAGE_ENCLAVE_THREAD_CONTROL = exports.PAGE_GRAPHICS_COHERENT = exports.PAGE_GRAPHICS_EXECUTE_READWRITE = exports.PAGE_GRAPHICS_EXECUTE_READ = exports.PAGE_GRAPHICS_EXECUTE = exports.PAGE_GRAPHICS_READWRITE = exports.PAGE_GRAPHICS_READONLY = exports.PAGE_GRAPHICS_NOACCESS = exports.PAGE_WRITECOMBINE = exports.PAGE_NOCACHE = exports.PAGE_GUARD = exports.PAGE_EXECUTE_WRITECOPY = exports.PAGE_EXECUTE_READWRITE = exports.PAGE_EXECUTE_READ = exports.PAGE_EXECUTE = exports.PAGE_WRITECOPY = exports.PAGE_READWRITE = exports.PAGE_READONLY = exports.PAGE_NOACCESS = exports.MAX_PATH = void 0;
exports.MAKELANGID = exports.FORMAT_MESSAGE_MAX_WIDTH_MASK = exports.FORMAT_MESSAGE_ARGUMENT_ARRAY = exports.FORMAT_MESSAGE_FROM_SYSTEM = exports.FORMAT_MESSAGE_FROM_HMODULE = exports.FORMAT_MESSAGE_FROM_STRING = exports.FORMAT_MESSAGE_IGNORE_INSERTS = exports.FORMAT_MESSAGE_ALLOCATE_BUFFER = exports.STATUS_INVALID_PARAMETER = exports.EXCEPTION_ACCESS_VIOLATION = exports.EXCEPTION_BREAKPOINT = exports.UNWIND_INFO = exports.RUNTIME_FUNCTION = exports.IMAGE_FIRST_SECTION = exports.FILETIME = exports.EXCEPTION_POINTERS = exports.EXCEPTION_RECORD = exports.IMAGE_SECTION_HEADER = exports.IMAGE_THUNK_DATA64 = exports.IMAGE_IMPORT_DESCRIPTOR = exports.IMAGE_DEBUG_DIRECTORY = exports.IMAGE_NT_HEADERS64 = exports.IMAGE_OPTIONAL_HEADER64 = exports.IMAGE_FILE_HEADER = exports.IMAGE_DOS_HEADER = exports.IMAGE_DATA_DIRECTORY = exports.IMAGE_SNAP_BY_ORDINAL64 = exports.IMAGE_ORDINAL64 = exports.b64_LOW_WORD = exports.IMAGE_ORDINAL_FLAG32 = exports.IMAGE_ORDINAL_FLAG64 = exports.IMAGE_DIRECTORY_ENTRY_COM_DESCRIPTOR = exports.IMAGE_DIRECTORY_ENTRY_DELAY_IMPORT = exports.IMAGE_DIRECTORY_ENTRY_IAT = exports.IMAGE_DIRECTORY_ENTRY_BOUND_IMPORT = exports.IMAGE_DIRECTORY_ENTRY_LOAD_CONFIG = exports.IMAGE_DIRECTORY_ENTRY_TLS = exports.IMAGE_DIRECTORY_ENTRY_GLOBALPTR = exports.IMAGE_DIRECTORY_ENTRY_ARCHITECTURE = exports.IMAGE_DIRECTORY_ENTRY_DEBUG = exports.IMAGE_DIRECTORY_ENTRY_BASERELOC = exports.IMAGE_DIRECTORY_ENTRY_SECURITY = exports.IMAGE_DIRECTORY_ENTRY_EXCEPTION = exports.IMAGE_DIRECTORY_ENTRY_RESOURCE = exports.IMAGE_DIRECTORY_ENTRY_IMPORT = exports.IMAGE_DIRECTORY_ENTRY_EXPORT = exports.IMAGE_DOS_SIGNATURE = exports.IMAGE_NUMBEROF_DIRECTORY_ENTRIES = exports.ULONG_PTR = exports.ULONGLONG = void 0;
exports.LANG_GUJARATI = exports.LANG_GREENLANDIC = exports.LANG_GREEK = exports.LANG_GERMAN = exports.LANG_GEORGIAN = exports.LANG_GALICIAN = exports.LANG_FULAH = exports.LANG_FRISIAN = exports.LANG_FRENCH = exports.LANG_FINNISH = exports.LANG_FILIPINO = exports.LANG_FARSI = exports.LANG_FAEROESE = exports.LANG_ESTONIAN = exports.LANG_ENGLISH = exports.LANG_DUTCH = exports.LANG_DIVEHI = exports.LANG_DARI = exports.LANG_DANISH = exports.LANG_CZECH = exports.LANG_CROATIAN = exports.LANG_CORSICAN = exports.LANG_CHINESE_TRADITIONAL = exports.LANG_CHINESE_SIMPLIFIED = exports.LANG_CHINESE = exports.LANG_CHEROKEE = exports.LANG_CENTRAL_KURDISH = exports.LANG_CATALAN = exports.LANG_BULGARIAN = exports.LANG_BOSNIAN_NEUTRAL = exports.LANG_BOSNIAN = exports.LANG_BRETON = exports.LANG_BENGALI = exports.LANG_BELARUSIAN = exports.LANG_BASQUE = exports.LANG_BASHKIR = exports.LANG_BANGLA = exports.LANG_AZERBAIJANI = exports.LANG_AZERI = exports.LANG_ASSAMESE = exports.LANG_ARMENIAN = exports.LANG_ARABIC = exports.LANG_AMHARIC = exports.LANG_ALSATIAN = exports.LANG_ALBANIAN = exports.LANG_AFRIKAANS = exports.LANG_INVARIANT = exports.LANG_NEUTRAL = exports.SUBLANGID = exports.PRIMARYLANGID = void 0;
exports.LANG_ROMANSH = exports.LANG_ROMANIAN = exports.LANG_QUECHUA = exports.LANG_PUNJABI = exports.LANG_PULAR = exports.LANG_PORTUGUESE = exports.LANG_POLISH = exports.LANG_PERSIAN = exports.LANG_PASHTO = exports.LANG_ORIYA = exports.LANG_ODIA = exports.LANG_OCCITAN = exports.LANG_NORWEGIAN = exports.LANG_NEPALI = exports.LANG_MONGOLIAN = exports.LANG_MOHAWK = exports.LANG_MARATHI = exports.LANG_MAPUDUNGUN = exports.LANG_MAORI = exports.LANG_MANIPURI = exports.LANG_MALTESE = exports.LANG_MALAYALAM = exports.LANG_MALAY = exports.LANG_MACEDONIAN = exports.LANG_LUXEMBOURGISH = exports.LANG_LOWER_SORBIAN = exports.LANG_LITHUANIAN = exports.LANG_LATVIAN = exports.LANG_LAO = exports.LANG_KYRGYZ = exports.LANG_KOREAN = exports.LANG_KONKANI = exports.LANG_KINYARWANDA = exports.LANG_KICHE = exports.LANG_KHMER = exports.LANG_KAZAK = exports.LANG_KASHMIRI = exports.LANG_KANNADA = exports.LANG_JAPANESE = exports.LANG_ITALIAN = exports.LANG_IRISH = exports.LANG_INUKTITUT = exports.LANG_INDONESIAN = exports.LANG_IGBO = exports.LANG_ICELANDIC = exports.LANG_HUNGARIAN = exports.LANG_HINDI = exports.LANG_HEBREW = exports.LANG_HAWAIIAN = exports.LANG_HAUSA = void 0;
exports.SUBLANG_ALBANIAN_ALBANIA = exports.SUBLANG_AFRIKAANS_SOUTH_AFRICA = exports.SUBLANG_UI_CUSTOM_DEFAULT = exports.SUBLANG_CUSTOM_UNSPECIFIED = exports.SUBLANG_CUSTOM_DEFAULT = exports.SUBLANG_SYS_DEFAULT = exports.SUBLANG_DEFAULT = exports.SUBLANG_NEUTRAL = exports.LANG_ZULU = exports.LANG_YORUBA = exports.LANG_YI = exports.LANG_YAKUT = exports.LANG_XHOSA = exports.LANG_WOLOF = exports.LANG_WELSH = exports.LANG_VIETNAMESE = exports.LANG_VALENCIAN = exports.LANG_UZBEK = exports.LANG_URDU = exports.LANG_UPPER_SORBIAN = exports.LANG_UKRAINIAN = exports.LANG_UIGHUR = exports.LANG_TURKMEN = exports.LANG_TURKISH = exports.LANG_TSWANA = exports.LANG_TIGRINYA = exports.LANG_TIGRIGNA = exports.LANG_TIBETAN = exports.LANG_THAI = exports.LANG_TELUGU = exports.LANG_TATAR = exports.LANG_TAMIL = exports.LANG_TAMAZIGHT = exports.LANG_TAJIK = exports.LANG_SYRIAC = exports.LANG_SWEDISH = exports.LANG_SWAHILI = exports.LANG_SPANISH = exports.LANG_SOTHO = exports.LANG_SLOVENIAN = exports.LANG_SLOVAK = exports.LANG_SINHALESE = exports.LANG_SINDHI = exports.LANG_SERBIAN_NEUTRAL = exports.LANG_SERBIAN = exports.LANG_SCOTTISH_GAELIC = exports.LANG_SANSKRIT = exports.LANG_SAMI = exports.LANG_SAKHA = exports.LANG_RUSSIAN = void 0;
exports.SUBLANG_DIVEHI_MALDIVES = exports.SUBLANG_DARI_AFGHANISTAN = exports.SUBLANG_DANISH_DENMARK = exports.SUBLANG_CROATIAN_BOSNIA_HERZEGOVINA_LATIN = exports.SUBLANG_CROATIAN_CROATIA = exports.SUBLANG_CZECH_CZECH_REPUBLIC = exports.SUBLANG_CORSICAN_FRANCE = exports.SUBLANG_CHINESE_MACAU = exports.SUBLANG_CHINESE_SINGAPORE = exports.SUBLANG_CHINESE_HONGKONG = exports.SUBLANG_CHINESE_SIMPLIFIED = exports.SUBLANG_CHINESE_TRADITIONAL = exports.SUBLANG_CHEROKEE_CHEROKEE = exports.SUBLANG_CENTRAL_KURDISH_IRAQ = exports.SUBLANG_CATALAN_CATALAN = exports.SUBLANG_BULGARIAN_BULGARIA = exports.SUBLANG_BRETON_FRANCE = exports.SUBLANG_BOSNIAN_BOSNIA_HERZEGOVINA_CYRILLIC = exports.SUBLANG_BOSNIAN_BOSNIA_HERZEGOVINA_LATIN = exports.SUBLANG_BENGALI_BANGLADESH = exports.SUBLANG_BENGALI_INDIA = exports.SUBLANG_BELARUSIAN_BELARUS = exports.SUBLANG_BASQUE_BASQUE = exports.SUBLANG_BASHKIR_RUSSIA = exports.SUBLANG_BANGLA_BANGLADESH = exports.SUBLANG_BANGLA_INDIA = exports.SUBLANG_AZERBAIJANI_AZERBAIJAN_CYRILLIC = exports.SUBLANG_AZERBAIJANI_AZERBAIJAN_LATIN = exports.SUBLANG_AZERI_CYRILLIC = exports.SUBLANG_AZERI_LATIN = exports.SUBLANG_ASSAMESE_INDIA = exports.SUBLANG_ARMENIAN_ARMENIA = exports.SUBLANG_ARABIC_QATAR = exports.SUBLANG_ARABIC_BAHRAIN = exports.SUBLANG_ARABIC_UAE = exports.SUBLANG_ARABIC_KUWAIT = exports.SUBLANG_ARABIC_LEBANON = exports.SUBLANG_ARABIC_JORDAN = exports.SUBLANG_ARABIC_SYRIA = exports.SUBLANG_ARABIC_YEMEN = exports.SUBLANG_ARABIC_OMAN = exports.SUBLANG_ARABIC_TUNISIA = exports.SUBLANG_ARABIC_MOROCCO = exports.SUBLANG_ARABIC_ALGERIA = exports.SUBLANG_ARABIC_LIBYA = exports.SUBLANG_ARABIC_EGYPT = exports.SUBLANG_ARABIC_IRAQ = exports.SUBLANG_ARABIC_SAUDI_ARABIA = exports.SUBLANG_AMHARIC_ETHIOPIA = exports.SUBLANG_ALSATIAN_FRANCE = void 0;
exports.SUBLANG_INUKTITUT_CANADA_LATIN = exports.SUBLANG_INUKTITUT_CANADA = exports.SUBLANG_INDONESIAN_INDONESIA = exports.SUBLANG_IGBO_NIGERIA = exports.SUBLANG_ICELANDIC_ICELAND = exports.SUBLANG_HUNGARIAN_HUNGARY = exports.SUBLANG_HINDI_INDIA = exports.SUBLANG_HEBREW_ISRAEL = exports.SUBLANG_HAWAIIAN_US = exports.SUBLANG_HAUSA_NIGERIA_LATIN = exports.SUBLANG_GUJARATI_INDIA = exports.SUBLANG_GREENLANDIC_GREENLAND = exports.SUBLANG_GREEK_GREECE = exports.SUBLANG_GERMAN_LIECHTENSTEIN = exports.SUBLANG_GERMAN_LUXEMBOURG = exports.SUBLANG_GERMAN_AUSTRIAN = exports.SUBLANG_GERMAN_SWISS = exports.SUBLANG_GERMAN = exports.SUBLANG_GEORGIAN_GEORGIA = exports.SUBLANG_GALICIAN_GALICIAN = exports.SUBLANG_FULAH_SENEGAL = exports.SUBLANG_FRISIAN_NETHERLANDS = exports.SUBLANG_FRENCH_MONACO = exports.SUBLANG_FRENCH_LUXEMBOURG = exports.SUBLANG_FRENCH_SWISS = exports.SUBLANG_FRENCH_CANADIAN = exports.SUBLANG_FRENCH_BELGIAN = exports.SUBLANG_FRENCH = exports.SUBLANG_FINNISH_FINLAND = exports.SUBLANG_FILIPINO_PHILIPPINES = exports.SUBLANG_FAEROESE_FAROE_ISLANDS = exports.SUBLANG_ESTONIAN_ESTONIA = exports.SUBLANG_ENGLISH_SINGAPORE = exports.SUBLANG_ENGLISH_MALAYSIA = exports.SUBLANG_ENGLISH_INDIA = exports.SUBLANG_ENGLISH_PHILIPPINES = exports.SUBLANG_ENGLISH_ZIMBABWE = exports.SUBLANG_ENGLISH_TRINIDAD = exports.SUBLANG_ENGLISH_BELIZE = exports.SUBLANG_ENGLISH_CARIBBEAN = exports.SUBLANG_ENGLISH_JAMAICA = exports.SUBLANG_ENGLISH_SOUTH_AFRICA = exports.SUBLANG_ENGLISH_EIRE = exports.SUBLANG_ENGLISH_NZ = exports.SUBLANG_ENGLISH_CAN = exports.SUBLANG_ENGLISH_AUS = exports.SUBLANG_ENGLISH_UK = exports.SUBLANG_ENGLISH_US = exports.SUBLANG_DUTCH_BELGIAN = exports.SUBLANG_DUTCH = void 0;
exports.SUBLANG_ROMANSH_SWITZERLAND = exports.SUBLANG_ROMANIAN_ROMANIA = exports.SUBLANG_QUECHUA_PERU = exports.SUBLANG_QUECHUA_ECUADOR = exports.SUBLANG_QUECHUA_BOLIVIA = exports.SUBLANG_PUNJABI_PAKISTAN = exports.SUBLANG_PUNJABI_INDIA = exports.SUBLANG_PULAR_SENEGAL = exports.SUBLANG_PORTUGUESE_BRAZILIAN = exports.SUBLANG_PORTUGUESE = exports.SUBLANG_POLISH_POLAND = exports.SUBLANG_PERSIAN_IRAN = exports.SUBLANG_PASHTO_AFGHANISTAN = exports.SUBLANG_ORIYA_INDIA = exports.SUBLANG_ODIA_INDIA = exports.SUBLANG_OCCITAN_FRANCE = exports.SUBLANG_NORWEGIAN_NYNORSK = exports.SUBLANG_NORWEGIAN_BOKMAL = exports.SUBLANG_NEPALI_NEPAL = exports.SUBLANG_NEPALI_INDIA = exports.SUBLANG_MONGOLIAN_PRC = exports.SUBLANG_MONGOLIAN_CYRILLIC_MONGOLIA = exports.SUBLANG_MOHAWK_MOHAWK = exports.SUBLANG_MARATHI_INDIA = exports.SUBLANG_MAPUDUNGUN_CHILE = exports.SUBLANG_MAORI_NEW_ZEALAND = exports.SUBLANG_MALTESE_MALTA = exports.SUBLANG_MALAYALAM_INDIA = exports.SUBLANG_MALAY_BRUNEI_DARUSSALAM = exports.SUBLANG_MALAY_MALAYSIA = exports.SUBLANG_MACEDONIAN_MACEDONIA = exports.SUBLANG_LUXEMBOURGISH_LUXEMBOURG = exports.SUBLANG_LOWER_SORBIAN_GERMANY = exports.SUBLANG_LITHUANIAN = exports.SUBLANG_LATVIAN_LATVIA = exports.SUBLANG_LAO_LAO = exports.SUBLANG_KYRGYZ_KYRGYZSTAN = exports.SUBLANG_KOREAN = exports.SUBLANG_KONKANI_INDIA = exports.SUBLANG_KINYARWANDA_RWANDA = exports.SUBLANG_KICHE_GUATEMALA = exports.SUBLANG_KHMER_CAMBODIA = exports.SUBLANG_KAZAK_KAZAKHSTAN = exports.SUBLANG_KASHMIRI_INDIA = exports.SUBLANG_KASHMIRI_SASIA = exports.SUBLANG_KANNADA_INDIA = exports.SUBLANG_JAPANESE_JAPAN = exports.SUBLANG_ITALIAN_SWISS = exports.SUBLANG_ITALIAN = exports.SUBLANG_IRISH_IRELAND = void 0;
exports.SUBLANG_SPANISH_US = exports.SUBLANG_SPANISH_PUERTO_RICO = exports.SUBLANG_SPANISH_NICARAGUA = exports.SUBLANG_SPANISH_HONDURAS = exports.SUBLANG_SPANISH_EL_SALVADOR = exports.SUBLANG_SPANISH_BOLIVIA = exports.SUBLANG_SPANISH_PARAGUAY = exports.SUBLANG_SPANISH_URUGUAY = exports.SUBLANG_SPANISH_CHILE = exports.SUBLANG_SPANISH_ECUADOR = exports.SUBLANG_SPANISH_ARGENTINA = exports.SUBLANG_SPANISH_PERU = exports.SUBLANG_SPANISH_COLOMBIA = exports.SUBLANG_SPANISH_VENEZUELA = exports.SUBLANG_SPANISH_DOMINICAN_REPUBLIC = exports.SUBLANG_SPANISH_PANAMA = exports.SUBLANG_SPANISH_COSTA_RICA = exports.SUBLANG_SPANISH_GUATEMALA = exports.SUBLANG_SPANISH_MODERN = exports.SUBLANG_SPANISH_MEXICAN = exports.SUBLANG_SPANISH = exports.SUBLANG_SLOVENIAN_SLOVENIA = exports.SUBLANG_SLOVAK_SLOVAKIA = exports.SUBLANG_SOTHO_NORTHERN_SOUTH_AFRICA = exports.SUBLANG_SINHALESE_SRI_LANKA = exports.SUBLANG_SINDHI_AFGHANISTAN = exports.SUBLANG_SINDHI_PAKISTAN = exports.SUBLANG_SINDHI_INDIA = exports.SUBLANG_SERBIAN_CYRILLIC = exports.SUBLANG_SERBIAN_LATIN = exports.SUBLANG_SERBIAN_CROATIA = exports.SUBLANG_SERBIAN_SERBIA_CYRILLIC = exports.SUBLANG_SERBIAN_SERBIA_LATIN = exports.SUBLANG_SERBIAN_MONTENEGRO_CYRILLIC = exports.SUBLANG_SERBIAN_MONTENEGRO_LATIN = exports.SUBLANG_SERBIAN_BOSNIA_HERZEGOVINA_CYRILLIC = exports.SUBLANG_SERBIAN_BOSNIA_HERZEGOVINA_LATIN = exports.SUBLANG_SCOTTISH_GAELIC = exports.SUBLANG_SANSKRIT_INDIA = exports.SUBLANG_SAMI_INARI_FINLAND = exports.SUBLANG_SAMI_SKOLT_FINLAND = exports.SUBLANG_SAMI_SOUTHERN_SWEDEN = exports.SUBLANG_SAMI_SOUTHERN_NORWAY = exports.SUBLANG_SAMI_LULE_SWEDEN = exports.SUBLANG_SAMI_LULE_NORWAY = exports.SUBLANG_SAMI_NORTHERN_FINLAND = exports.SUBLANG_SAMI_NORTHERN_SWEDEN = exports.SUBLANG_SAMI_NORTHERN_NORWAY = exports.SUBLANG_SAKHA_RUSSIA = exports.SUBLANG_RUSSIAN_RUSSIA = void 0;
exports.ERROR_MOD_NOT_FOUND = exports.SUBLANG_ZULU_SOUTH_AFRICA = exports.SUBLANG_YORUBA_NIGERIA = exports.SUBLANG_YI_PRC = exports.SUBLANG_YAKUT_RUSSIA = exports.SUBLANG_XHOSA_SOUTH_AFRICA = exports.SUBLANG_WOLOF_SENEGAL = exports.SUBLANG_WELSH_UNITED_KINGDOM = exports.SUBLANG_VIETNAMESE_VIETNAM = exports.SUBLANG_VALENCIAN_VALENCIA = exports.SUBLANG_UZBEK_CYRILLIC = exports.SUBLANG_UZBEK_LATIN = exports.SUBLANG_URDU_INDIA = exports.SUBLANG_URDU_PAKISTAN = exports.SUBLANG_UPPER_SORBIAN_GERMANY = exports.SUBLANG_UKRAINIAN_UKRAINE = exports.SUBLANG_UIGHUR_PRC = exports.SUBLANG_TURKMEN_TURKMENISTAN = exports.SUBLANG_TURKISH_TURKEY = exports.SUBLANG_TSWANA_SOUTH_AFRICA = exports.SUBLANG_TSWANA_BOTSWANA = exports.SUBLANG_TIGRINYA_ETHIOPIA = exports.SUBLANG_TIGRINYA_ERITREA = exports.SUBLANG_TIGRIGNA_ERITREA = exports.SUBLANG_TIBETAN_PRC = exports.SUBLANG_THAI_THAILAND = exports.SUBLANG_TELUGU_INDIA = exports.SUBLANG_TATAR_RUSSIA = exports.SUBLANG_TAMIL_SRI_LANKA = exports.SUBLANG_TAMIL_INDIA = exports.SUBLANG_TAMAZIGHT_MOROCCO_TIFINAGH = exports.SUBLANG_TAMAZIGHT_ALGERIA_LATIN = exports.SUBLANG_TAJIK_TAJIKISTAN = exports.SUBLANG_SYRIAC_SYRIA = exports.SUBLANG_SWEDISH_FINLAND = exports.SUBLANG_SWEDISH = exports.SUBLANG_SWAHILI_KENYA = void 0;
const tslib_1 = require("tslib");
const bin_1 = require("./bin");
const core_1 = require("./core");
const nativeclass_1 = require("./nativeclass");
const nativetype_1 = require("./nativetype");
exports.MAX_PATH = 260;
exports.PAGE_NOACCESS = 0x01;
exports.PAGE_READONLY = 0x02;
exports.PAGE_READWRITE = 0x04;
exports.PAGE_WRITECOPY = 0x08;
exports.PAGE_EXECUTE = 0x10;
exports.PAGE_EXECUTE_READ = 0x20;
exports.PAGE_EXECUTE_READWRITE = 0x40;
exports.PAGE_EXECUTE_WRITECOPY = 0x80;
exports.PAGE_GUARD = 0x100;
exports.PAGE_NOCACHE = 0x200;
exports.PAGE_WRITECOMBINE = 0x400;
exports.PAGE_GRAPHICS_NOACCESS = 0x0800;
exports.PAGE_GRAPHICS_READONLY = 0x1000;
exports.PAGE_GRAPHICS_READWRITE = 0x2000;
exports.PAGE_GRAPHICS_EXECUTE = 0x4000;
exports.PAGE_GRAPHICS_EXECUTE_READ = 0x8000;
exports.PAGE_GRAPHICS_EXECUTE_READWRITE = 0x10000;
exports.PAGE_GRAPHICS_COHERENT = 0x20000;
exports.PAGE_ENCLAVE_THREAD_CONTROL = 0x80000000;
exports.PAGE_REVERT_TO_FILE_MAP = 0x80000000;
exports.PAGE_TARGETS_NO_UPDATE = 0x40000000;
exports.PAGE_TARGETS_INVALID = 0x40000000;
exports.PAGE_ENCLAVE_UNVALIDATED = 0x20000000;
exports.PAGE_ENCLAVE_DECOMMIT = 0x10000000;
exports.MEM_COMMIT = 0x00001000;
exports.MEM_RESERVE = 0x00002000;
exports.MEM_REPLACE_PLACEHOLDER = 0x00004000;
exports.MEM_RESERVE_PLACEHOLDER = 0x00040000;
exports.MEM_RESET = 0x00080000;
exports.MEM_TOP_DOWN = 0x00100000;
exports.MEM_WRITE_WATCH = 0x00200000;
exports.MEM_PHYSICAL = 0x00400000;
exports.MEM_ROTATE = 0x00800000;
exports.MEM_DIFFERENT_IMAGE_BASE_OK = 0x00800000;
exports.MEM_RESET_UNDO = 0x01000000;
exports.MEM_LARGE_PAGES = 0x20000000;
exports.MEM_4MB_PAGES = 0x80000000;
exports.MEM_64K_PAGES = (exports.MEM_LARGE_PAGES | exports.MEM_PHYSICAL);
exports.MEM_UNMAP_WITH_TRANSIENT_BOOST = 0x00000001;
exports.MEM_COALESCE_PLACEHOLDERS = 0x00000001;
exports.MEM_PRESERVE_PLACEHOLDER = 0x00000002;
exports.MEM_DECOMMIT = 0x00004000;
exports.MEM_RELEASE = 0x00008000;
exports.MEM_FREE = 0x00010000;
exports.CHAR = nativetype_1.uint8_t;
exports.BYTE = nativetype_1.uint8_t;
exports.WORD = nativetype_1.uint16_t;
exports.DWORD = nativetype_1.uint32_t;
exports.LONG = nativetype_1.int32_t;
exports.ULONGLONG = nativetype_1.bin64_t;
exports.ULONG_PTR = nativetype_1.bin64_t;
exports.IMAGE_NUMBEROF_DIRECTORY_ENTRIES = 16;
exports.IMAGE_DOS_SIGNATURE = 0x5A4D; // MZ
exports.IMAGE_DIRECTORY_ENTRY_EXPORT = 0; // Export Directory
exports.IMAGE_DIRECTORY_ENTRY_IMPORT = 1; // Import Directory
exports.IMAGE_DIRECTORY_ENTRY_RESOURCE = 2; // Resource Directory
exports.IMAGE_DIRECTORY_ENTRY_EXCEPTION = 3; // Exception Directory
exports.IMAGE_DIRECTORY_ENTRY_SECURITY = 4; // Security Directory
exports.IMAGE_DIRECTORY_ENTRY_BASERELOC = 5; // Base Relocation Table
exports.IMAGE_DIRECTORY_ENTRY_DEBUG = 6; // Debug Directory
//      IMAGE_DIRECTORY_ENTRY_COPYRIGHT       7   // (X86 usage)
exports.IMAGE_DIRECTORY_ENTRY_ARCHITECTURE = 7; // Architecture Specific Data
exports.IMAGE_DIRECTORY_ENTRY_GLOBALPTR = 8; // RVA of GP
exports.IMAGE_DIRECTORY_ENTRY_TLS = 9; // TLS Directory
exports.IMAGE_DIRECTORY_ENTRY_LOAD_CONFIG = 10; // Load Configuration Directory
exports.IMAGE_DIRECTORY_ENTRY_BOUND_IMPORT = 11; // Bound Import Directory in headers
exports.IMAGE_DIRECTORY_ENTRY_IAT = 12; // Import Address Table
exports.IMAGE_DIRECTORY_ENTRY_DELAY_IMPORT = 13; // Delay Load Import Descriptors
exports.IMAGE_DIRECTORY_ENTRY_COM_DESCRIPTOR = 14; // COM Runtime descriptor
exports.IMAGE_ORDINAL_FLAG64 = bin_1.bin.make64(0, 0x80000000);
exports.IMAGE_ORDINAL_FLAG32 = 0x80000000;
exports.b64_LOW_WORD = bin_1.bin.make(0xffff, 4);
function IMAGE_ORDINAL64(Ordinal) { return (bin_1.bin.bitand(Ordinal, exports.b64_LOW_WORD)); }
exports.IMAGE_ORDINAL64 = IMAGE_ORDINAL64;
function IMAGE_SNAP_BY_ORDINAL64(Ordinal) { return (bin_1.bin.bitand(Ordinal, exports.IMAGE_ORDINAL_FLAG64) !== nativetype_1.bin64_t.zero); }
exports.IMAGE_SNAP_BY_ORDINAL64 = IMAGE_SNAP_BY_ORDINAL64;
let IMAGE_DATA_DIRECTORY = class IMAGE_DATA_DIRECTORY extends nativeclass_1.NativeClass {
};
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.DWORD)
], IMAGE_DATA_DIRECTORY.prototype, "VirtualAddress", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.DWORD)
], IMAGE_DATA_DIRECTORY.prototype, "Size", void 0);
IMAGE_DATA_DIRECTORY = tslib_1.__decorate([
    nativeclass_1.nativeClass()
], IMAGE_DATA_DIRECTORY);
exports.IMAGE_DATA_DIRECTORY = IMAGE_DATA_DIRECTORY;
let IMAGE_DOS_HEADER = class IMAGE_DOS_HEADER extends nativeclass_1.NativeClass {
};
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.WORD)
], IMAGE_DOS_HEADER.prototype, "e_magic", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.WORD)
], IMAGE_DOS_HEADER.prototype, "e_cblp", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.WORD)
], IMAGE_DOS_HEADER.prototype, "e_cp", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.WORD)
], IMAGE_DOS_HEADER.prototype, "e_crlc", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.WORD)
], IMAGE_DOS_HEADER.prototype, "e_cparhdr", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.WORD)
], IMAGE_DOS_HEADER.prototype, "e_minalloc", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.WORD)
], IMAGE_DOS_HEADER.prototype, "e_maxalloc", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.WORD)
], IMAGE_DOS_HEADER.prototype, "e_ss", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.WORD)
], IMAGE_DOS_HEADER.prototype, "e_sp", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.WORD)
], IMAGE_DOS_HEADER.prototype, "e_csum", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.WORD)
], IMAGE_DOS_HEADER.prototype, "e_ip", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.WORD)
], IMAGE_DOS_HEADER.prototype, "e_cs", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.WORD)
], IMAGE_DOS_HEADER.prototype, "e_lfarlc", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.WORD)
], IMAGE_DOS_HEADER.prototype, "e_ovno", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativeclass_1.NativeArray.make(exports.WORD, 4))
], IMAGE_DOS_HEADER.prototype, "e_res", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.WORD)
], IMAGE_DOS_HEADER.prototype, "e_oemid", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.WORD)
], IMAGE_DOS_HEADER.prototype, "e_oeminfo", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativeclass_1.NativeArray.make(exports.WORD, 10))
], IMAGE_DOS_HEADER.prototype, "e_res2", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.WORD)
], IMAGE_DOS_HEADER.prototype, "e_lfanew", void 0);
IMAGE_DOS_HEADER = tslib_1.__decorate([
    nativeclass_1.nativeClass()
], IMAGE_DOS_HEADER);
exports.IMAGE_DOS_HEADER = IMAGE_DOS_HEADER;
let IMAGE_FILE_HEADER = class IMAGE_FILE_HEADER extends nativeclass_1.NativeClass {
};
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.WORD)
], IMAGE_FILE_HEADER.prototype, "Machine", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.WORD)
], IMAGE_FILE_HEADER.prototype, "NumberOfSections", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.DWORD)
], IMAGE_FILE_HEADER.prototype, "TimeDateStamp", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.DWORD)
], IMAGE_FILE_HEADER.prototype, "PointerToSymbolTable", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.DWORD)
], IMAGE_FILE_HEADER.prototype, "NumberOfSymbols", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.WORD)
], IMAGE_FILE_HEADER.prototype, "SizeOfOptionalHeader", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.WORD)
], IMAGE_FILE_HEADER.prototype, "Characteristics", void 0);
IMAGE_FILE_HEADER = tslib_1.__decorate([
    nativeclass_1.nativeClass()
], IMAGE_FILE_HEADER);
exports.IMAGE_FILE_HEADER = IMAGE_FILE_HEADER;
let IMAGE_OPTIONAL_HEADER64 = class IMAGE_OPTIONAL_HEADER64 extends nativeclass_1.NativeClass {
};
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.WORD)
], IMAGE_OPTIONAL_HEADER64.prototype, "Magic", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.BYTE)
], IMAGE_OPTIONAL_HEADER64.prototype, "MajorLinkerVersion", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.BYTE)
], IMAGE_OPTIONAL_HEADER64.prototype, "MinorLinkerVersion", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.DWORD)
], IMAGE_OPTIONAL_HEADER64.prototype, "SizeOfCode", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.DWORD)
], IMAGE_OPTIONAL_HEADER64.prototype, "SizeOfInitializedData", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.DWORD)
], IMAGE_OPTIONAL_HEADER64.prototype, "SizeOfUninitializedData", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.DWORD)
], IMAGE_OPTIONAL_HEADER64.prototype, "AddressOfEntryPoint", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.DWORD)
], IMAGE_OPTIONAL_HEADER64.prototype, "BaseOfCode", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.ULONGLONG)
], IMAGE_OPTIONAL_HEADER64.prototype, "ImageBase", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.DWORD)
], IMAGE_OPTIONAL_HEADER64.prototype, "SectionAlignment", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.DWORD)
], IMAGE_OPTIONAL_HEADER64.prototype, "FileAlignment", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.WORD)
], IMAGE_OPTIONAL_HEADER64.prototype, "MajorOperatingSystemVersion", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.WORD)
], IMAGE_OPTIONAL_HEADER64.prototype, "MinorOperatingSystemVersion", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.WORD)
], IMAGE_OPTIONAL_HEADER64.prototype, "MajorImageVersion", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.WORD)
], IMAGE_OPTIONAL_HEADER64.prototype, "MinorImageVersion", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.WORD)
], IMAGE_OPTIONAL_HEADER64.prototype, "MajorSubsystemVersion", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.WORD)
], IMAGE_OPTIONAL_HEADER64.prototype, "MinorSubsystemVersion", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.DWORD)
], IMAGE_OPTIONAL_HEADER64.prototype, "Win32VersionValue", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.DWORD)
], IMAGE_OPTIONAL_HEADER64.prototype, "SizeOfImage", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.DWORD)
], IMAGE_OPTIONAL_HEADER64.prototype, "SizeOfHeaders", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.DWORD)
], IMAGE_OPTIONAL_HEADER64.prototype, "CheckSum", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.WORD)
], IMAGE_OPTIONAL_HEADER64.prototype, "Subsystem", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.WORD)
], IMAGE_OPTIONAL_HEADER64.prototype, "DllCharacteristics", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.ULONGLONG)
], IMAGE_OPTIONAL_HEADER64.prototype, "SizeOfStackReserve", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.ULONGLONG)
], IMAGE_OPTIONAL_HEADER64.prototype, "SizeOfStackCommit", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.ULONGLONG)
], IMAGE_OPTIONAL_HEADER64.prototype, "SizeOfHeapReserve", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.ULONGLONG)
], IMAGE_OPTIONAL_HEADER64.prototype, "SizeOfHeapCommit", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.DWORD)
], IMAGE_OPTIONAL_HEADER64.prototype, "LoaderFlags", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.DWORD)
], IMAGE_OPTIONAL_HEADER64.prototype, "NumberOfRvaAndSizes", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativeclass_1.NativeArray.make(IMAGE_DATA_DIRECTORY, exports.IMAGE_NUMBEROF_DIRECTORY_ENTRIES))
], IMAGE_OPTIONAL_HEADER64.prototype, "DataDirectory", void 0);
IMAGE_OPTIONAL_HEADER64 = tslib_1.__decorate([
    nativeclass_1.nativeClass()
], IMAGE_OPTIONAL_HEADER64);
exports.IMAGE_OPTIONAL_HEADER64 = IMAGE_OPTIONAL_HEADER64;
let IMAGE_NT_HEADERS64 = class IMAGE_NT_HEADERS64 extends nativeclass_1.NativeClass {
};
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.DWORD)
], IMAGE_NT_HEADERS64.prototype, "Signature", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(IMAGE_FILE_HEADER)
], IMAGE_NT_HEADERS64.prototype, "FileHeader", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(IMAGE_OPTIONAL_HEADER64)
], IMAGE_NT_HEADERS64.prototype, "OptionalHeader", void 0);
IMAGE_NT_HEADERS64 = tslib_1.__decorate([
    nativeclass_1.nativeClass()
], IMAGE_NT_HEADERS64);
exports.IMAGE_NT_HEADERS64 = IMAGE_NT_HEADERS64;
let IMAGE_DEBUG_DIRECTORY = class IMAGE_DEBUG_DIRECTORY extends nativeclass_1.NativeClass {
};
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.DWORD)
], IMAGE_DEBUG_DIRECTORY.prototype, "Characteristics", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.DWORD)
], IMAGE_DEBUG_DIRECTORY.prototype, "TimeDateStamp", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.WORD)
], IMAGE_DEBUG_DIRECTORY.prototype, "MajorVersion", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.WORD)
], IMAGE_DEBUG_DIRECTORY.prototype, "MinorVersion", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.DWORD)
], IMAGE_DEBUG_DIRECTORY.prototype, "Type", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.DWORD)
], IMAGE_DEBUG_DIRECTORY.prototype, "SizeOfData", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.DWORD)
], IMAGE_DEBUG_DIRECTORY.prototype, "AddressOfRawData", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.DWORD)
], IMAGE_DEBUG_DIRECTORY.prototype, "PointerToRawData", void 0);
IMAGE_DEBUG_DIRECTORY = tslib_1.__decorate([
    nativeclass_1.nativeClass()
], IMAGE_DEBUG_DIRECTORY);
exports.IMAGE_DEBUG_DIRECTORY = IMAGE_DEBUG_DIRECTORY;
let IMAGE_IMPORT_DESCRIPTOR = class IMAGE_IMPORT_DESCRIPTOR extends nativeclass_1.NativeClass {
};
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.WORD)
], IMAGE_IMPORT_DESCRIPTOR.prototype, "Characteristics", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.WORD)
], IMAGE_IMPORT_DESCRIPTOR.prototype, "OriginalFirstThunk", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.DWORD)
], IMAGE_IMPORT_DESCRIPTOR.prototype, "TimeDateStamp", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.DWORD)
], IMAGE_IMPORT_DESCRIPTOR.prototype, "ForwarderChain", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.DWORD)
], IMAGE_IMPORT_DESCRIPTOR.prototype, "Name", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.DWORD)
], IMAGE_IMPORT_DESCRIPTOR.prototype, "FirstThunk", void 0);
IMAGE_IMPORT_DESCRIPTOR = tslib_1.__decorate([
    nativeclass_1.nativeClass()
], IMAGE_IMPORT_DESCRIPTOR);
exports.IMAGE_IMPORT_DESCRIPTOR = IMAGE_IMPORT_DESCRIPTOR;
class IMAGE_THUNK_DATA64_union extends nativeclass_1.NativeClass {
}
IMAGE_THUNK_DATA64_union.defineAsUnion({
    ForwarderString: exports.ULONGLONG,
    Function: exports.ULONGLONG,
    Ordinal: exports.ULONGLONG,
    AddressOfData: exports.ULONGLONG, // PIMAGE_IMPORT_BY_NAME
});
let IMAGE_THUNK_DATA64 = class IMAGE_THUNK_DATA64 extends nativeclass_1.NativeClass {
};
tslib_1.__decorate([
    nativeclass_1.nativeField(IMAGE_THUNK_DATA64_union)
], IMAGE_THUNK_DATA64.prototype, "u1", void 0);
IMAGE_THUNK_DATA64 = tslib_1.__decorate([
    nativeclass_1.nativeClass()
], IMAGE_THUNK_DATA64);
exports.IMAGE_THUNK_DATA64 = IMAGE_THUNK_DATA64;
class IMAGE_SECTION_HEADER_Misc extends nativeclass_1.NativeClass {
}
IMAGE_SECTION_HEADER_Misc.defineAsUnion({
    PhysicalAddress: exports.DWORD,
    VirtualSize: exports.DWORD,
});
const IMAGE_SIZEOF_SHORT_NAME = 8;
let IMAGE_SECTION_HEADER = class IMAGE_SECTION_HEADER extends nativeclass_1.NativeClass {
};
tslib_1.__decorate([
    nativeclass_1.nativeField(nativeclass_1.NativeArray.make(exports.BYTE, IMAGE_SIZEOF_SHORT_NAME))
], IMAGE_SECTION_HEADER.prototype, "Name", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(IMAGE_SECTION_HEADER_Misc)
], IMAGE_SECTION_HEADER.prototype, "Misc", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.DWORD)
], IMAGE_SECTION_HEADER.prototype, "VirtualAddress", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.DWORD)
], IMAGE_SECTION_HEADER.prototype, "SizeOfRawData", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.DWORD)
], IMAGE_SECTION_HEADER.prototype, "PointerToRawData", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.DWORD)
], IMAGE_SECTION_HEADER.prototype, "PointerToRelocations", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.DWORD)
], IMAGE_SECTION_HEADER.prototype, "PointerToLinenumbers", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.WORD)
], IMAGE_SECTION_HEADER.prototype, "NumberOfRelocations", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.WORD)
], IMAGE_SECTION_HEADER.prototype, "NumberOfLinenumbers", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.DWORD)
], IMAGE_SECTION_HEADER.prototype, "Characteristics", void 0);
IMAGE_SECTION_HEADER = tslib_1.__decorate([
    nativeclass_1.nativeClass()
], IMAGE_SECTION_HEADER);
exports.IMAGE_SECTION_HEADER = IMAGE_SECTION_HEADER;
const EXCEPTION_MAXIMUM_PARAMETERS = 15; // maximum number of exception parameters
let EXCEPTION_RECORD = class EXCEPTION_RECORD extends nativeclass_1.NativeClass {
};
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.DWORD)
], EXCEPTION_RECORD.prototype, "ExceptionCode", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.DWORD)
], EXCEPTION_RECORD.prototype, "ExceptionFlags", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(core_1.VoidPointer)
], EXCEPTION_RECORD.prototype, "ExceptionRecord", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(core_1.VoidPointer)
], EXCEPTION_RECORD.prototype, "ExceptionAddress", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.DWORD)
], EXCEPTION_RECORD.prototype, "NumberParameters", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.DWORD)
], EXCEPTION_RECORD.prototype, "dummy", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(nativeclass_1.NativeArray.make(exports.ULONG_PTR, EXCEPTION_MAXIMUM_PARAMETERS))
], EXCEPTION_RECORD.prototype, "ExceptionInformation", void 0);
EXCEPTION_RECORD = tslib_1.__decorate([
    nativeclass_1.nativeClass()
], EXCEPTION_RECORD);
exports.EXCEPTION_RECORD = EXCEPTION_RECORD;
// typedef struct DECLSPEC_ALIGN(16) DECLSPEC_NOINITALL _CONTEXT {
//     //
//     // Register parameter home addresses.
//     //
//     // N.B. These fields are for convience - they could be used to extend the
//     //      context record in the future.
//     //
//     DWORD64 P1Home;
//     DWORD64 P2Home;
//     DWORD64 P3Home;
//     DWORD64 P4Home;
//     DWORD64 P5Home;
//     DWORD64 P6Home;
//     //
//     // Control flags.
//     //
//     DWORD ContextFlags;
//     DWORD MxCsr;
//     //
//     // Segment Registers and processor flags.
//     //
//     WORD   SegCs;
//     WORD   SegDs;
//     WORD   SegEs;
//     WORD   SegFs;
//     WORD   SegGs;
//     WORD   SegSs;
//     DWORD EFlags;
//     //
//     // Debug registers
//     //
//     DWORD64 Dr0;
//     DWORD64 Dr1;
//     DWORD64 Dr2;
//     DWORD64 Dr3;
//     DWORD64 Dr6;
//     DWORD64 Dr7;
//     //
//     // Integer registers.
//     //
//     DWORD64 Rax;
//     DWORD64 Rcx;
//     DWORD64 Rdx;
//     DWORD64 Rbx;
//     DWORD64 Rsp;
//     DWORD64 Rbp;
//     DWORD64 Rsi;
//     DWORD64 Rdi;
//     DWORD64 R8;
//     DWORD64 R9;
//     DWORD64 R10;
//     DWORD64 R11;
//     DWORD64 R12;
//     DWORD64 R13;
//     DWORD64 R14;
//     DWORD64 R15;
//     //
//     // Program counter.
//     //
//     DWORD64 Rip;
//     //
//     // Floating point state.
//     //
//     union {
//         XMM_SAVE_AREA32 FltSave;
//         struct {
//             M128A Header[2];
//             M128A Legacy[8];
//             M128A Xmm0;
//             M128A Xmm1;
//             M128A Xmm2;
//             M128A Xmm3;
//             M128A Xmm4;
//             M128A Xmm5;
//             M128A Xmm6;
//             M128A Xmm7;
//             M128A Xmm8;
//             M128A Xmm9;
//             M128A Xmm10;
//             M128A Xmm11;
//             M128A Xmm12;
//             M128A Xmm13;
//             M128A Xmm14;
//             M128A Xmm15;
//         } DUMMYSTRUCTNAME;
//     } DUMMYUNIONNAME;
//     //
//     // Vector registers.
//     //
//     M128A VectorRegister[26];
//     DWORD64 VectorControl;
//     //
//     // Special debug control registers.
//     //
//     DWORD64 DebugControl;
//     DWORD64 LastBranchToRip;
//     DWORD64 LastBranchFromRip;
//     DWORD64 LastExceptionToRip;
//     DWORD64 LastExceptionFromRip;
// } CONTEXT, *PCONTEXT;
let EXCEPTION_POINTERS = class EXCEPTION_POINTERS extends nativeclass_1.NativeClass {
};
tslib_1.__decorate([
    nativeclass_1.nativeField(EXCEPTION_RECORD.ref())
], EXCEPTION_POINTERS.prototype, "ExceptionRecord", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(core_1.VoidPointer)
], EXCEPTION_POINTERS.prototype, "ContextRecord", void 0);
EXCEPTION_POINTERS = tslib_1.__decorate([
    nativeclass_1.nativeClass()
], EXCEPTION_POINTERS);
exports.EXCEPTION_POINTERS = EXCEPTION_POINTERS;
let FILETIME = class FILETIME extends nativeclass_1.NativeClass {
};
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.DWORD)
], FILETIME.prototype, "dwLowDateTime", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.DWORD)
], FILETIME.prototype, "dwHighDateTime", void 0);
FILETIME = tslib_1.__decorate([
    nativeclass_1.nativeClass()
], FILETIME);
exports.FILETIME = FILETIME;
function IMAGE_FIRST_SECTION(ntheader) {
    return ntheader.addAs(IMAGE_SECTION_HEADER, IMAGE_NT_HEADERS64.offsetOf('OptionalHeader') + ntheader.FileHeader.SizeOfOptionalHeader);
}
exports.IMAGE_FIRST_SECTION = IMAGE_FIRST_SECTION;
let RUNTIME_FUNCTION = class RUNTIME_FUNCTION extends nativeclass_1.NativeClass {
};
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.DWORD)
], RUNTIME_FUNCTION.prototype, "BeginAddress", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.DWORD)
], RUNTIME_FUNCTION.prototype, "EndAddress", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(exports.DWORD)
], RUNTIME_FUNCTION.prototype, "UnwindInfoAddress", void 0);
RUNTIME_FUNCTION = tslib_1.__decorate([
    nativeclass_1.nativeClass()
], RUNTIME_FUNCTION);
exports.RUNTIME_FUNCTION = RUNTIME_FUNCTION;
const UBYTE = nativetype_1.uint8_t;
const USHORT = nativetype_1.uint16_t;
const ULONG = nativetype_1.uint32_t;
let UNWIND_CODE = class UNWIND_CODE extends nativeclass_1.NativeClass {
};
tslib_1.__decorate([
    nativeclass_1.nativeField(UBYTE)
], UNWIND_CODE.prototype, "CodeOffset", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(USHORT, null, 4)
], UNWIND_CODE.prototype, "UnwindOp", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(USHORT, null, 4)
], UNWIND_CODE.prototype, "OpInfo", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(USHORT, 0)
], UNWIND_CODE.prototype, "FrameOffset", void 0);
UNWIND_CODE = tslib_1.__decorate([
    nativeclass_1.nativeClass()
], UNWIND_CODE);
let UNWIND_INFO = class UNWIND_INFO extends nativeclass_1.NativeClass {
    /*  UNWIND_CODE MoreUnwindCode[((CountOfCodes + 1) & ~1) - 1];
    *   union {
    *       OPTIONAL ULONG ExceptionHandler;
    *       OPTIONAL ULONG FunctionEntry;
    *   };
    *   OPTIONAL ULONG ExceptionData[]; */
    getUnwindCode(i) {
        return this.addAs(UNWIND_CODE, UNWIND_CODE_SIZE * i + UNWIND_CODE_OFFSET);
    }
    getExceptionHandler() {
        return this.getUint32(((this.CountOfCodes + 1) & ~1) * UNWIND_CODE_SIZE + UNWIND_CODE_OFFSET);
    }
    getFunctionEntry() {
        return this.getUint32(((this.CountOfCodes + 1) & ~1) * UNWIND_CODE_SIZE + UNWIND_CODE_OFFSET);
    }
    getExceptionData() {
        return this.add(((this.CountOfCodes + 1) & ~1) * UNWIND_CODE_SIZE + UNWIND_CODE_OFFSET + 4);
    }
};
tslib_1.__decorate([
    nativeclass_1.nativeField(UBYTE, null, 3)
], UNWIND_INFO.prototype, "Version", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(UBYTE, null, 5)
], UNWIND_INFO.prototype, "Flags", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(UBYTE)
], UNWIND_INFO.prototype, "SizeOfProlog", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(UBYTE)
], UNWIND_INFO.prototype, "CountOfCodes", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(UBYTE, null, 4)
], UNWIND_INFO.prototype, "FrameRegister", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(UBYTE, null, 4)
], UNWIND_INFO.prototype, "FrameOffset", void 0);
tslib_1.__decorate([
    nativeclass_1.nativeField(UNWIND_CODE)
], UNWIND_INFO.prototype, "UnwindCode_first", void 0);
UNWIND_INFO = tslib_1.__decorate([
    nativeclass_1.nativeClass()
], UNWIND_INFO);
exports.UNWIND_INFO = UNWIND_INFO;
const UNWIND_CODE_SIZE = UNWIND_INFO[nativetype_1.NativeType.size];
const UNWIND_CODE_OFFSET = UNWIND_INFO.offsetOf('UnwindCode_first');
exports.EXCEPTION_BREAKPOINT = 0x80000003 | 0;
exports.EXCEPTION_ACCESS_VIOLATION = 0xC0000005 | 0;
exports.STATUS_INVALID_PARAMETER = 0xC000000D | 0;
exports.FORMAT_MESSAGE_ALLOCATE_BUFFER = 0x00000100;
exports.FORMAT_MESSAGE_IGNORE_INSERTS = 0x00000200;
exports.FORMAT_MESSAGE_FROM_STRING = 0x00000400;
exports.FORMAT_MESSAGE_FROM_HMODULE = 0x00000800;
exports.FORMAT_MESSAGE_FROM_SYSTEM = 0x00001000;
exports.FORMAT_MESSAGE_ARGUMENT_ARRAY = 0x00002000;
exports.FORMAT_MESSAGE_MAX_WIDTH_MASK = 0x000000FF;
function MAKELANGID(p, s) {
    return (s << 10) | p;
}
exports.MAKELANGID = MAKELANGID;
function PRIMARYLANGID(lgid) {
    return lgid & 0x3ff;
}
exports.PRIMARYLANGID = PRIMARYLANGID;
function SUBLANGID(lgid) {
    return (lgid & 0xffff) >>> 10;
}
exports.SUBLANGID = SUBLANGID;
exports.LANG_NEUTRAL = 0x00;
exports.LANG_INVARIANT = 0x7f;
exports.LANG_AFRIKAANS = 0x36;
exports.LANG_ALBANIAN = 0x1c;
exports.LANG_ALSATIAN = 0x84;
exports.LANG_AMHARIC = 0x5e;
exports.LANG_ARABIC = 0x01;
exports.LANG_ARMENIAN = 0x2b;
exports.LANG_ASSAMESE = 0x4d;
exports.LANG_AZERI = 0x2c; // for Azerbaijani, LANG_AZERBAIJANI is preferred
exports.LANG_AZERBAIJANI = 0x2c;
exports.LANG_BANGLA = 0x45;
exports.LANG_BASHKIR = 0x6d;
exports.LANG_BASQUE = 0x2d;
exports.LANG_BELARUSIAN = 0x23;
exports.LANG_BENGALI = 0x45; // Some prefer to use LANG_BANGLA
exports.LANG_BRETON = 0x7e;
exports.LANG_BOSNIAN = 0x1a; // Use with SUBLANG_BOSNIAN_* Sublanguage IDs
exports.LANG_BOSNIAN_NEUTRAL = 0x781a; // Use with the ConvertDefaultLocale function
exports.LANG_BULGARIAN = 0x02;
exports.LANG_CATALAN = 0x03;
exports.LANG_CENTRAL_KURDISH = 0x92;
exports.LANG_CHEROKEE = 0x5c;
exports.LANG_CHINESE = 0x04; // Use with SUBLANG_CHINESE_* Sublanguage IDs
exports.LANG_CHINESE_SIMPLIFIED = 0x04; // Use with the ConvertDefaultLocale function
exports.LANG_CHINESE_TRADITIONAL = 0x7c04; // Use with the ConvertDefaultLocale function
exports.LANG_CORSICAN = 0x83;
exports.LANG_CROATIAN = 0x1a;
exports.LANG_CZECH = 0x05;
exports.LANG_DANISH = 0x06;
exports.LANG_DARI = 0x8c;
exports.LANG_DIVEHI = 0x65;
exports.LANG_DUTCH = 0x13;
exports.LANG_ENGLISH = 0x09;
exports.LANG_ESTONIAN = 0x25;
exports.LANG_FAEROESE = 0x38;
exports.LANG_FARSI = 0x29; // Deprecated: use LANG_PERSIAN instead
exports.LANG_FILIPINO = 0x64;
exports.LANG_FINNISH = 0x0b;
exports.LANG_FRENCH = 0x0c;
exports.LANG_FRISIAN = 0x62;
exports.LANG_FULAH = 0x67;
exports.LANG_GALICIAN = 0x56;
exports.LANG_GEORGIAN = 0x37;
exports.LANG_GERMAN = 0x07;
exports.LANG_GREEK = 0x08;
exports.LANG_GREENLANDIC = 0x6f;
exports.LANG_GUJARATI = 0x47;
exports.LANG_HAUSA = 0x68;
exports.LANG_HAWAIIAN = 0x75;
exports.LANG_HEBREW = 0x0d;
exports.LANG_HINDI = 0x39;
exports.LANG_HUNGARIAN = 0x0e;
exports.LANG_ICELANDIC = 0x0f;
exports.LANG_IGBO = 0x70;
exports.LANG_INDONESIAN = 0x21;
exports.LANG_INUKTITUT = 0x5d;
exports.LANG_IRISH = 0x3c; // Use with the SUBLANG_IRISH_IRELAND Sublanguage ID
exports.LANG_ITALIAN = 0x10;
exports.LANG_JAPANESE = 0x11;
exports.LANG_KANNADA = 0x4b;
exports.LANG_KASHMIRI = 0x60;
exports.LANG_KAZAK = 0x3f;
exports.LANG_KHMER = 0x53;
exports.LANG_KICHE = 0x86;
exports.LANG_KINYARWANDA = 0x87;
exports.LANG_KONKANI = 0x57;
exports.LANG_KOREAN = 0x12;
exports.LANG_KYRGYZ = 0x40;
exports.LANG_LAO = 0x54;
exports.LANG_LATVIAN = 0x26;
exports.LANG_LITHUANIAN = 0x27;
exports.LANG_LOWER_SORBIAN = 0x2e;
exports.LANG_LUXEMBOURGISH = 0x6e;
exports.LANG_MACEDONIAN = 0x2f; // the Former Yugoslav Republic of Macedonia
exports.LANG_MALAY = 0x3e;
exports.LANG_MALAYALAM = 0x4c;
exports.LANG_MALTESE = 0x3a;
exports.LANG_MANIPURI = 0x58;
exports.LANG_MAORI = 0x81;
exports.LANG_MAPUDUNGUN = 0x7a;
exports.LANG_MARATHI = 0x4e;
exports.LANG_MOHAWK = 0x7c;
exports.LANG_MONGOLIAN = 0x50;
exports.LANG_NEPALI = 0x61;
exports.LANG_NORWEGIAN = 0x14;
exports.LANG_OCCITAN = 0x82;
exports.LANG_ODIA = 0x48;
exports.LANG_ORIYA = 0x48; // Deprecated: use LANG_ODIA, instead.
exports.LANG_PASHTO = 0x63;
exports.LANG_PERSIAN = 0x29;
exports.LANG_POLISH = 0x15;
exports.LANG_PORTUGUESE = 0x16;
exports.LANG_PULAR = 0x67; // Deprecated: use LANG_FULAH instead
exports.LANG_PUNJABI = 0x46;
exports.LANG_QUECHUA = 0x6b;
exports.LANG_ROMANIAN = 0x18;
exports.LANG_ROMANSH = 0x17;
exports.LANG_RUSSIAN = 0x19;
exports.LANG_SAKHA = 0x85;
exports.LANG_SAMI = 0x3b;
exports.LANG_SANSKRIT = 0x4f;
exports.LANG_SCOTTISH_GAELIC = 0x91;
exports.LANG_SERBIAN = 0x1a; // Use with the SUBLANG_SERBIAN_* Sublanguage IDs
exports.LANG_SERBIAN_NEUTRAL = 0x7c1a; // Use with the ConvertDefaultLocale function
exports.LANG_SINDHI = 0x59;
exports.LANG_SINHALESE = 0x5b;
exports.LANG_SLOVAK = 0x1b;
exports.LANG_SLOVENIAN = 0x24;
exports.LANG_SOTHO = 0x6c;
exports.LANG_SPANISH = 0x0a;
exports.LANG_SWAHILI = 0x41;
exports.LANG_SWEDISH = 0x1d;
exports.LANG_SYRIAC = 0x5a;
exports.LANG_TAJIK = 0x28;
exports.LANG_TAMAZIGHT = 0x5f;
exports.LANG_TAMIL = 0x49;
exports.LANG_TATAR = 0x44;
exports.LANG_TELUGU = 0x4a;
exports.LANG_THAI = 0x1e;
exports.LANG_TIBETAN = 0x51;
exports.LANG_TIGRIGNA = 0x73;
exports.LANG_TIGRINYA = 0x73; // Preferred spelling in locale
exports.LANG_TSWANA = 0x32;
exports.LANG_TURKISH = 0x1f;
exports.LANG_TURKMEN = 0x42;
exports.LANG_UIGHUR = 0x80;
exports.LANG_UKRAINIAN = 0x22;
exports.LANG_UPPER_SORBIAN = 0x2e;
exports.LANG_URDU = 0x20;
exports.LANG_UZBEK = 0x43;
exports.LANG_VALENCIAN = 0x03;
exports.LANG_VIETNAMESE = 0x2a;
exports.LANG_WELSH = 0x52;
exports.LANG_WOLOF = 0x88;
exports.LANG_XHOSA = 0x34;
exports.LANG_YAKUT = 0x85; // Deprecated: use LANG_SAKHA,instead
exports.LANG_YI = 0x78;
exports.LANG_YORUBA = 0x6a;
exports.LANG_ZULU = 0x35;
exports.SUBLANG_NEUTRAL = 0x00; // language neutral
exports.SUBLANG_DEFAULT = 0x01; // user default
exports.SUBLANG_SYS_DEFAULT = 0x02; // system default
exports.SUBLANG_CUSTOM_DEFAULT = 0x03; // default custom language/locale
exports.SUBLANG_CUSTOM_UNSPECIFIED = 0x04; // custom language/locale
exports.SUBLANG_UI_CUSTOM_DEFAULT = 0x05; // Default custom MUI language/locale
exports.SUBLANG_AFRIKAANS_SOUTH_AFRICA = 0x01; // Afrikaans (South Africa) 0x0436 af-ZA
exports.SUBLANG_ALBANIAN_ALBANIA = 0x01; // Albanian (Albania) 0x041c sq-AL
exports.SUBLANG_ALSATIAN_FRANCE = 0x01; // Alsatian (France) 0x0484
exports.SUBLANG_AMHARIC_ETHIOPIA = 0x01; // Amharic (Ethiopia) 0x045e
exports.SUBLANG_ARABIC_SAUDI_ARABIA = 0x01; // Arabic (Saudi Arabia)
exports.SUBLANG_ARABIC_IRAQ = 0x02; // Arabic (Iraq)
exports.SUBLANG_ARABIC_EGYPT = 0x03; // Arabic (Egypt)
exports.SUBLANG_ARABIC_LIBYA = 0x04; // Arabic (Libya)
exports.SUBLANG_ARABIC_ALGERIA = 0x05; // Arabic (Algeria)
exports.SUBLANG_ARABIC_MOROCCO = 0x06; // Arabic (Morocco)
exports.SUBLANG_ARABIC_TUNISIA = 0x07; // Arabic (Tunisia)
exports.SUBLANG_ARABIC_OMAN = 0x08; // Arabic (Oman)
exports.SUBLANG_ARABIC_YEMEN = 0x09; // Arabic (Yemen)
exports.SUBLANG_ARABIC_SYRIA = 0x0a; // Arabic (Syria)
exports.SUBLANG_ARABIC_JORDAN = 0x0b; // Arabic (Jordan)
exports.SUBLANG_ARABIC_LEBANON = 0x0c; // Arabic (Lebanon)
exports.SUBLANG_ARABIC_KUWAIT = 0x0d; // Arabic (Kuwait)
exports.SUBLANG_ARABIC_UAE = 0x0e; // Arabic (U.A.E)
exports.SUBLANG_ARABIC_BAHRAIN = 0x0f; // Arabic (Bahrain)
exports.SUBLANG_ARABIC_QATAR = 0x10; // Arabic (Qatar)
exports.SUBLANG_ARMENIAN_ARMENIA = 0x01; // Armenian (Armenia) 0x042b hy-AM
exports.SUBLANG_ASSAMESE_INDIA = 0x01; // Assamese (India) 0x044d
exports.SUBLANG_AZERI_LATIN = 0x01; // Azeri (Latin) - for Azerbaijani, SUBLANG_AZERBAIJANI_AZERBAIJAN_LATIN preferred
exports.SUBLANG_AZERI_CYRILLIC = 0x02; // Azeri (Cyrillic) - for Azerbaijani, SUBLANG_AZERBAIJANI_AZERBAIJAN_CYRILLIC preferred
exports.SUBLANG_AZERBAIJANI_AZERBAIJAN_LATIN = 0x01; // Azerbaijani (Azerbaijan, Latin)
exports.SUBLANG_AZERBAIJANI_AZERBAIJAN_CYRILLIC = 0x02; // Azerbaijani (Azerbaijan, Cyrillic)
exports.SUBLANG_BANGLA_INDIA = 0x01; // Bangla (India)
exports.SUBLANG_BANGLA_BANGLADESH = 0x02; // Bangla (Bangladesh)
exports.SUBLANG_BASHKIR_RUSSIA = 0x01; // Bashkir (Russia) 0x046d ba-RU
exports.SUBLANG_BASQUE_BASQUE = 0x01; // Basque (Basque) 0x042d eu-ES
exports.SUBLANG_BELARUSIAN_BELARUS = 0x01; // Belarusian (Belarus) 0x0423 be-BY
exports.SUBLANG_BENGALI_INDIA = 0x01; // Bengali (India) - Note some prefer SUBLANG_BANGLA_INDIA
exports.SUBLANG_BENGALI_BANGLADESH = 0x02; // Bengali (Bangladesh) - Note some prefer SUBLANG_BANGLA_BANGLADESH
exports.SUBLANG_BOSNIAN_BOSNIA_HERZEGOVINA_LATIN = 0x05; // Bosnian (Bosnia and Herzegovina - Latin) 0x141a bs-BA-Latn
exports.SUBLANG_BOSNIAN_BOSNIA_HERZEGOVINA_CYRILLIC = 0x08; // Bosnian (Bosnia and Herzegovina - Cyrillic) 0x201a bs-BA-Cyrl
exports.SUBLANG_BRETON_FRANCE = 0x01; // Breton (France) 0x047e
exports.SUBLANG_BULGARIAN_BULGARIA = 0x01; // Bulgarian (Bulgaria) 0x0402
exports.SUBLANG_CATALAN_CATALAN = 0x01; // Catalan (Catalan) 0x0403
exports.SUBLANG_CENTRAL_KURDISH_IRAQ = 0x01; // Central Kurdish (Iraq) 0x0492 ku-Arab-IQ
exports.SUBLANG_CHEROKEE_CHEROKEE = 0x01; // Cherokee (Cherokee) 0x045c chr-Cher-US
exports.SUBLANG_CHINESE_TRADITIONAL = 0x01; // Chinese (Taiwan) 0x0404 zh-TW
exports.SUBLANG_CHINESE_SIMPLIFIED = 0x02; // Chinese (PR China) 0x0804 zh-CN
exports.SUBLANG_CHINESE_HONGKONG = 0x03; // Chinese (Hong Kong S.A.R., P.R.C.) 0x0c04 zh-HK
exports.SUBLANG_CHINESE_SINGAPORE = 0x04; // Chinese (Singapore) 0x1004 zh-SG
exports.SUBLANG_CHINESE_MACAU = 0x05; // Chinese (Macau S.A.R.) 0x1404 zh-MO
exports.SUBLANG_CORSICAN_FRANCE = 0x01; // Corsican (France) 0x0483
exports.SUBLANG_CZECH_CZECH_REPUBLIC = 0x01; // Czech (Czech Republic) 0x0405
exports.SUBLANG_CROATIAN_CROATIA = 0x01; // Croatian (Croatia)
exports.SUBLANG_CROATIAN_BOSNIA_HERZEGOVINA_LATIN = 0x04; // Croatian (Bosnia and Herzegovina - Latin) 0x101a hr-BA
exports.SUBLANG_DANISH_DENMARK = 0x01; // Danish (Denmark) 0x0406
exports.SUBLANG_DARI_AFGHANISTAN = 0x01; // Dari (Afghanistan)
exports.SUBLANG_DIVEHI_MALDIVES = 0x01; // Divehi (Maldives) 0x0465 div-MV
exports.SUBLANG_DUTCH = 0x01; // Dutch
exports.SUBLANG_DUTCH_BELGIAN = 0x02; // Dutch (Belgian)
exports.SUBLANG_ENGLISH_US = 0x01; // English (USA)
exports.SUBLANG_ENGLISH_UK = 0x02; // English (UK)
exports.SUBLANG_ENGLISH_AUS = 0x03; // English (Australian)
exports.SUBLANG_ENGLISH_CAN = 0x04; // English (Canadian)
exports.SUBLANG_ENGLISH_NZ = 0x05; // English (New Zealand)
exports.SUBLANG_ENGLISH_EIRE = 0x06; // English (Irish)
exports.SUBLANG_ENGLISH_SOUTH_AFRICA = 0x07; // English (South Africa)
exports.SUBLANG_ENGLISH_JAMAICA = 0x08; // English (Jamaica)
exports.SUBLANG_ENGLISH_CARIBBEAN = 0x09; // English (Caribbean)
exports.SUBLANG_ENGLISH_BELIZE = 0x0a; // English (Belize)
exports.SUBLANG_ENGLISH_TRINIDAD = 0x0b; // English (Trinidad)
exports.SUBLANG_ENGLISH_ZIMBABWE = 0x0c; // English (Zimbabwe)
exports.SUBLANG_ENGLISH_PHILIPPINES = 0x0d; // English (Philippines)
exports.SUBLANG_ENGLISH_INDIA = 0x10; // English (India)
exports.SUBLANG_ENGLISH_MALAYSIA = 0x11; // English (Malaysia)
exports.SUBLANG_ENGLISH_SINGAPORE = 0x12; // English (Singapore)
exports.SUBLANG_ESTONIAN_ESTONIA = 0x01; // Estonian (Estonia) 0x0425 et-EE
exports.SUBLANG_FAEROESE_FAROE_ISLANDS = 0x01; // Faroese (Faroe Islands) 0x0438 fo-FO
exports.SUBLANG_FILIPINO_PHILIPPINES = 0x01; // Filipino (Philippines) 0x0464 fil-PH
exports.SUBLANG_FINNISH_FINLAND = 0x01; // Finnish (Finland) 0x040b
exports.SUBLANG_FRENCH = 0x01; // French
exports.SUBLANG_FRENCH_BELGIAN = 0x02; // French (Belgian)
exports.SUBLANG_FRENCH_CANADIAN = 0x03; // French (Canadian)
exports.SUBLANG_FRENCH_SWISS = 0x04; // French (Swiss)
exports.SUBLANG_FRENCH_LUXEMBOURG = 0x05; // French (Luxembourg)
exports.SUBLANG_FRENCH_MONACO = 0x06; // French (Monaco)
exports.SUBLANG_FRISIAN_NETHERLANDS = 0x01; // Frisian (Netherlands) 0x0462 fy-NL
exports.SUBLANG_FULAH_SENEGAL = 0x02; // Fulah (Senegal) 0x0867 ff-Latn-SN
exports.SUBLANG_GALICIAN_GALICIAN = 0x01; // Galician (Galician) 0x0456 gl-ES
exports.SUBLANG_GEORGIAN_GEORGIA = 0x01; // Georgian (Georgia) 0x0437 ka-GE
exports.SUBLANG_GERMAN = 0x01; // German
exports.SUBLANG_GERMAN_SWISS = 0x02; // German (Swiss)
exports.SUBLANG_GERMAN_AUSTRIAN = 0x03; // German (Austrian)
exports.SUBLANG_GERMAN_LUXEMBOURG = 0x04; // German (Luxembourg)
exports.SUBLANG_GERMAN_LIECHTENSTEIN = 0x05; // German (Liechtenstein)
exports.SUBLANG_GREEK_GREECE = 0x01; // Greek (Greece)
exports.SUBLANG_GREENLANDIC_GREENLAND = 0x01; // Greenlandic (Greenland) 0x046f kl-GL
exports.SUBLANG_GUJARATI_INDIA = 0x01; // Gujarati (India (Gujarati Script)) 0x0447 gu-IN
exports.SUBLANG_HAUSA_NIGERIA_LATIN = 0x01; // Hausa (Latin, Nigeria) 0x0468 ha-NG-Latn
exports.SUBLANG_HAWAIIAN_US = 0x01; // Hawiian (US) 0x0475 haw-US
exports.SUBLANG_HEBREW_ISRAEL = 0x01; // Hebrew (Israel) 0x040d
exports.SUBLANG_HINDI_INDIA = 0x01; // Hindi (India) 0x0439 hi-IN
exports.SUBLANG_HUNGARIAN_HUNGARY = 0x01; // Hungarian (Hungary) 0x040e
exports.SUBLANG_ICELANDIC_ICELAND = 0x01; // Icelandic (Iceland) 0x040f
exports.SUBLANG_IGBO_NIGERIA = 0x01; // Igbo (Nigeria) 0x0470 ig-NG
exports.SUBLANG_INDONESIAN_INDONESIA = 0x01; // Indonesian (Indonesia) 0x0421 id-ID
exports.SUBLANG_INUKTITUT_CANADA = 0x01; // Inuktitut (Syllabics) (Canada) 0x045d iu-CA-Cans
exports.SUBLANG_INUKTITUT_CANADA_LATIN = 0x02; // Inuktitut (Canada - Latin)
exports.SUBLANG_IRISH_IRELAND = 0x02; // Irish (Ireland)
exports.SUBLANG_ITALIAN = 0x01; // Italian
exports.SUBLANG_ITALIAN_SWISS = 0x02; // Italian (Swiss)
exports.SUBLANG_JAPANESE_JAPAN = 0x01; // Japanese (Japan) 0x0411
exports.SUBLANG_KANNADA_INDIA = 0x01; // Kannada (India (Kannada Script)) 0x044b kn-IN
exports.SUBLANG_KASHMIRI_SASIA = 0x02; // Kashmiri (South Asia)
exports.SUBLANG_KASHMIRI_INDIA = 0x02; // For app compatibility only
exports.SUBLANG_KAZAK_KAZAKHSTAN = 0x01; // Kazakh (Kazakhstan) 0x043f kk-KZ
exports.SUBLANG_KHMER_CAMBODIA = 0x01; // Khmer (Cambodia) 0x0453 kh-KH
exports.SUBLANG_KICHE_GUATEMALA = 0x01; // K'iche (Guatemala)
exports.SUBLANG_KINYARWANDA_RWANDA = 0x01; // Kinyarwanda (Rwanda) 0x0487 rw-RW
exports.SUBLANG_KONKANI_INDIA = 0x01; // Konkani (India) 0x0457 kok-IN
exports.SUBLANG_KOREAN = 0x01; // Korean (Extended Wansung)
exports.SUBLANG_KYRGYZ_KYRGYZSTAN = 0x01; // Kyrgyz (Kyrgyzstan) 0x0440 ky-KG
exports.SUBLANG_LAO_LAO = 0x01; // Lao (Lao PDR) 0x0454 lo-LA
exports.SUBLANG_LATVIAN_LATVIA = 0x01; // Latvian (Latvia) 0x0426 lv-LV
exports.SUBLANG_LITHUANIAN = 0x01; // Lithuanian
exports.SUBLANG_LOWER_SORBIAN_GERMANY = 0x02; // Lower Sorbian (Germany) 0x082e wee-DE
exports.SUBLANG_LUXEMBOURGISH_LUXEMBOURG = 0x01; // Luxembourgish (Luxembourg) 0x046e lb-LU
exports.SUBLANG_MACEDONIAN_MACEDONIA = 0x01; // Macedonian (Macedonia (FYROM)) 0x042f mk-MK
exports.SUBLANG_MALAY_MALAYSIA = 0x01; // Malay (Malaysia)
exports.SUBLANG_MALAY_BRUNEI_DARUSSALAM = 0x02; // Malay (Brunei Darussalam)
exports.SUBLANG_MALAYALAM_INDIA = 0x01; // Malayalam (India (Malayalam Script) ) 0x044c ml-IN
exports.SUBLANG_MALTESE_MALTA = 0x01; // Maltese (Malta) 0x043a mt-MT
exports.SUBLANG_MAORI_NEW_ZEALAND = 0x01; // Maori (New Zealand) 0x0481 mi-NZ
exports.SUBLANG_MAPUDUNGUN_CHILE = 0x01; // Mapudungun (Chile) 0x047a arn-CL
exports.SUBLANG_MARATHI_INDIA = 0x01; // Marathi (India) 0x044e mr-IN
exports.SUBLANG_MOHAWK_MOHAWK = 0x01; // Mohawk (Mohawk) 0x047c moh-CA
exports.SUBLANG_MONGOLIAN_CYRILLIC_MONGOLIA = 0x01; // Mongolian (Cyrillic, Mongolia)
exports.SUBLANG_MONGOLIAN_PRC = 0x02; // Mongolian (PRC)
exports.SUBLANG_NEPALI_INDIA = 0x02; // Nepali (India)
exports.SUBLANG_NEPALI_NEPAL = 0x01; // Nepali (Nepal) 0x0461 ne-NP
exports.SUBLANG_NORWEGIAN_BOKMAL = 0x01; // Norwegian (Bokmal)
exports.SUBLANG_NORWEGIAN_NYNORSK = 0x02; // Norwegian (Nynorsk)
exports.SUBLANG_OCCITAN_FRANCE = 0x01; // Occitan (France) 0x0482 oc-FR
exports.SUBLANG_ODIA_INDIA = 0x01; // Odia (India (Odia Script)) 0x0448 or-IN
exports.SUBLANG_ORIYA_INDIA = 0x01; // Deprecated: use SUBLANG_ODIA_INDIA instead
exports.SUBLANG_PASHTO_AFGHANISTAN = 0x01; // Pashto (Afghanistan)
exports.SUBLANG_PERSIAN_IRAN = 0x01; // Persian (Iran) 0x0429 fa-IR
exports.SUBLANG_POLISH_POLAND = 0x01; // Polish (Poland) 0x0415
exports.SUBLANG_PORTUGUESE = 0x02; // Portuguese
exports.SUBLANG_PORTUGUESE_BRAZILIAN = 0x01; // Portuguese (Brazil)
exports.SUBLANG_PULAR_SENEGAL = 0x02; // Deprecated: Use SUBLANG_FULAH_SENEGAL instead
exports.SUBLANG_PUNJABI_INDIA = 0x01; // Punjabi (India (Gurmukhi Script)) 0x0446 pa-IN
exports.SUBLANG_PUNJABI_PAKISTAN = 0x02; // Punjabi (Pakistan (Arabic Script)) 0x0846 pa-Arab-PK
exports.SUBLANG_QUECHUA_BOLIVIA = 0x01; // Quechua (Bolivia)
exports.SUBLANG_QUECHUA_ECUADOR = 0x02; // Quechua (Ecuador)
exports.SUBLANG_QUECHUA_PERU = 0x03; // Quechua (Peru)
exports.SUBLANG_ROMANIAN_ROMANIA = 0x01; // Romanian (Romania) 0x0418
exports.SUBLANG_ROMANSH_SWITZERLAND = 0x01; // Romansh (Switzerland) 0x0417 rm-CH
exports.SUBLANG_RUSSIAN_RUSSIA = 0x01; // Russian (Russia) 0x0419
exports.SUBLANG_SAKHA_RUSSIA = 0x01; // Sakha (Russia) 0x0485 sah-RU
exports.SUBLANG_SAMI_NORTHERN_NORWAY = 0x01; // Northern Sami (Norway)
exports.SUBLANG_SAMI_NORTHERN_SWEDEN = 0x02; // Northern Sami (Sweden)
exports.SUBLANG_SAMI_NORTHERN_FINLAND = 0x03; // Northern Sami (Finland)
exports.SUBLANG_SAMI_LULE_NORWAY = 0x04; // Lule Sami (Norway)
exports.SUBLANG_SAMI_LULE_SWEDEN = 0x05; // Lule Sami (Sweden)
exports.SUBLANG_SAMI_SOUTHERN_NORWAY = 0x06; // Southern Sami (Norway)
exports.SUBLANG_SAMI_SOUTHERN_SWEDEN = 0x07; // Southern Sami (Sweden)
exports.SUBLANG_SAMI_SKOLT_FINLAND = 0x08; // Skolt Sami (Finland)
exports.SUBLANG_SAMI_INARI_FINLAND = 0x09; // Inari Sami (Finland)
exports.SUBLANG_SANSKRIT_INDIA = 0x01; // Sanskrit (India) 0x044f sa-IN
exports.SUBLANG_SCOTTISH_GAELIC = 0x01; // Scottish Gaelic (United Kingdom) 0x0491 gd-GB
exports.SUBLANG_SERBIAN_BOSNIA_HERZEGOVINA_LATIN = 0x06; // Serbian (Bosnia and Herzegovina - Latin)
exports.SUBLANG_SERBIAN_BOSNIA_HERZEGOVINA_CYRILLIC = 0x07; // Serbian (Bosnia and Herzegovina - Cyrillic)
exports.SUBLANG_SERBIAN_MONTENEGRO_LATIN = 0x0b; // Serbian (Montenegro - Latn)
exports.SUBLANG_SERBIAN_MONTENEGRO_CYRILLIC = 0x0c; // Serbian (Montenegro - Cyrillic)
exports.SUBLANG_SERBIAN_SERBIA_LATIN = 0x09; // Serbian (Serbia - Latin)
exports.SUBLANG_SERBIAN_SERBIA_CYRILLIC = 0x0a; // Serbian (Serbia - Cyrillic)
exports.SUBLANG_SERBIAN_CROATIA = 0x01; // Croatian (Croatia) 0x041a hr-HR
exports.SUBLANG_SERBIAN_LATIN = 0x02; // Serbian (Latin)
exports.SUBLANG_SERBIAN_CYRILLIC = 0x03; // Serbian (Cyrillic)
exports.SUBLANG_SINDHI_INDIA = 0x01; // Sindhi (India) reserved 0x0459
exports.SUBLANG_SINDHI_PAKISTAN = 0x02; // Sindhi (Pakistan) 0x0859 sd-Arab-PK
exports.SUBLANG_SINDHI_AFGHANISTAN = 0x02; // For app compatibility only
exports.SUBLANG_SINHALESE_SRI_LANKA = 0x01; // Sinhalese (Sri Lanka)
exports.SUBLANG_SOTHO_NORTHERN_SOUTH_AFRICA = 0x01; // Northern Sotho (South Africa)
exports.SUBLANG_SLOVAK_SLOVAKIA = 0x01; // Slovak (Slovakia) 0x041b sk-SK
exports.SUBLANG_SLOVENIAN_SLOVENIA = 0x01; // Slovenian (Slovenia) 0x0424 sl-SI
exports.SUBLANG_SPANISH = 0x01; // Spanish (Castilian)
exports.SUBLANG_SPANISH_MEXICAN = 0x02; // Spanish (Mexico)
exports.SUBLANG_SPANISH_MODERN = 0x03; // Spanish (Modern)
exports.SUBLANG_SPANISH_GUATEMALA = 0x04; // Spanish (Guatemala)
exports.SUBLANG_SPANISH_COSTA_RICA = 0x05; // Spanish (Costa Rica)
exports.SUBLANG_SPANISH_PANAMA = 0x06; // Spanish (Panama)
exports.SUBLANG_SPANISH_DOMINICAN_REPUBLIC = 0x07; // Spanish (Dominican Republic)
exports.SUBLANG_SPANISH_VENEZUELA = 0x08; // Spanish (Venezuela)
exports.SUBLANG_SPANISH_COLOMBIA = 0x09; // Spanish (Colombia)
exports.SUBLANG_SPANISH_PERU = 0x0a; // Spanish (Peru)
exports.SUBLANG_SPANISH_ARGENTINA = 0x0b; // Spanish (Argentina)
exports.SUBLANG_SPANISH_ECUADOR = 0x0c; // Spanish (Ecuador)
exports.SUBLANG_SPANISH_CHILE = 0x0d; // Spanish (Chile)
exports.SUBLANG_SPANISH_URUGUAY = 0x0e; // Spanish (Uruguay)
exports.SUBLANG_SPANISH_PARAGUAY = 0x0f; // Spanish (Paraguay)
exports.SUBLANG_SPANISH_BOLIVIA = 0x10; // Spanish (Bolivia)
exports.SUBLANG_SPANISH_EL_SALVADOR = 0x11; // Spanish (El Salvador)
exports.SUBLANG_SPANISH_HONDURAS = 0x12; // Spanish (Honduras)
exports.SUBLANG_SPANISH_NICARAGUA = 0x13; // Spanish (Nicaragua)
exports.SUBLANG_SPANISH_PUERTO_RICO = 0x14; // Spanish (Puerto Rico)
exports.SUBLANG_SPANISH_US = 0x15; // Spanish (United States)
exports.SUBLANG_SWAHILI_KENYA = 0x01; // Swahili (Kenya) 0x0441 sw-KE
exports.SUBLANG_SWEDISH = 0x01; // Swedish
exports.SUBLANG_SWEDISH_FINLAND = 0x02; // Swedish (Finland)
exports.SUBLANG_SYRIAC_SYRIA = 0x01; // Syriac (Syria) 0x045a syr-SY
exports.SUBLANG_TAJIK_TAJIKISTAN = 0x01; // Tajik (Tajikistan) 0x0428 tg-TJ-Cyrl
exports.SUBLANG_TAMAZIGHT_ALGERIA_LATIN = 0x02; // Tamazight (Latin, Algeria) 0x085f tzm-Latn-DZ
exports.SUBLANG_TAMAZIGHT_MOROCCO_TIFINAGH = 0x04; // Tamazight (Tifinagh) 0x105f tzm-Tfng-MA
exports.SUBLANG_TAMIL_INDIA = 0x01; // Tamil (India)
exports.SUBLANG_TAMIL_SRI_LANKA = 0x02; // Tamil (Sri Lanka) 0x0849 ta-LK
exports.SUBLANG_TATAR_RUSSIA = 0x01; // Tatar (Russia) 0x0444 tt-RU
exports.SUBLANG_TELUGU_INDIA = 0x01; // Telugu (India (Telugu Script)) 0x044a te-IN
exports.SUBLANG_THAI_THAILAND = 0x01; // Thai (Thailand) 0x041e th-TH
exports.SUBLANG_TIBETAN_PRC = 0x01; // Tibetan (PRC)
exports.SUBLANG_TIGRIGNA_ERITREA = 0x02; // Tigrigna (Eritrea)
exports.SUBLANG_TIGRINYA_ERITREA = 0x02; // Tigrinya (Eritrea) 0x0873 ti-ER (preferred spelling)
exports.SUBLANG_TIGRINYA_ETHIOPIA = 0x01; // Tigrinya (Ethiopia) 0x0473 ti-ET
exports.SUBLANG_TSWANA_BOTSWANA = 0x02; // Setswana / Tswana (Botswana) 0x0832 tn-BW
exports.SUBLANG_TSWANA_SOUTH_AFRICA = 0x01; // Setswana / Tswana (South Africa) 0x0432 tn-ZA
exports.SUBLANG_TURKISH_TURKEY = 0x01; // Turkish (Turkey) 0x041f tr-TR
exports.SUBLANG_TURKMEN_TURKMENISTAN = 0x01; // Turkmen (Turkmenistan) 0x0442 tk-TM
exports.SUBLANG_UIGHUR_PRC = 0x01; // Uighur (PRC) 0x0480 ug-CN
exports.SUBLANG_UKRAINIAN_UKRAINE = 0x01; // Ukrainian (Ukraine) 0x0422 uk-UA
exports.SUBLANG_UPPER_SORBIAN_GERMANY = 0x01; // Upper Sorbian (Germany) 0x042e wen-DE
exports.SUBLANG_URDU_PAKISTAN = 0x01; // Urdu (Pakistan)
exports.SUBLANG_URDU_INDIA = 0x02; // Urdu (India)
exports.SUBLANG_UZBEK_LATIN = 0x01; // Uzbek (Latin)
exports.SUBLANG_UZBEK_CYRILLIC = 0x02; // Uzbek (Cyrillic)
exports.SUBLANG_VALENCIAN_VALENCIA = 0x02; // Valencian (Valencia) 0x0803 ca-ES-Valencia
exports.SUBLANG_VIETNAMESE_VIETNAM = 0x01; // Vietnamese (Vietnam) 0x042a vi-VN
exports.SUBLANG_WELSH_UNITED_KINGDOM = 0x01; // Welsh (United Kingdom) 0x0452 cy-GB
exports.SUBLANG_WOLOF_SENEGAL = 0x01; // Wolof (Senegal)
exports.SUBLANG_XHOSA_SOUTH_AFRICA = 0x01; // isiXhosa / Xhosa (South Africa) 0x0434 xh-ZA
exports.SUBLANG_YAKUT_RUSSIA = 0x01; // Deprecated: use SUBLANG_SAKHA_RUSSIA instead
exports.SUBLANG_YI_PRC = 0x01; // Yi (PRC)) 0x0478
exports.SUBLANG_YORUBA_NIGERIA = 0x01; // Yoruba (Nigeria) 046a yo-NG
exports.SUBLANG_ZULU_SOUTH_AFRICA = 0x01; // isiZulu / Zulu (South Africa) 0x0435 zu-ZA
exports.ERROR_MOD_NOT_FOUND = 126;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2luZG93c19oLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid2luZG93c19oLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQkFBNEI7QUFDNUIsaUNBQW9EO0FBQ3BELCtDQUFtRjtBQUNuRiw2Q0FBeUY7QUFFNUUsUUFBQSxRQUFRLEdBQUcsR0FBRyxDQUFDO0FBRWYsUUFBQSxhQUFhLEdBQXNCLElBQUksQ0FBQztBQUN4QyxRQUFBLGFBQWEsR0FBc0IsSUFBSSxDQUFDO0FBQ3hDLFFBQUEsY0FBYyxHQUFxQixJQUFJLENBQUM7QUFDeEMsUUFBQSxjQUFjLEdBQXFCLElBQUksQ0FBQztBQUN4QyxRQUFBLFlBQVksR0FBdUIsSUFBSSxDQUFDO0FBQ3hDLFFBQUEsaUJBQWlCLEdBQWtCLElBQUksQ0FBQztBQUN4QyxRQUFBLHNCQUFzQixHQUFhLElBQUksQ0FBQztBQUN4QyxRQUFBLHNCQUFzQixHQUFhLElBQUksQ0FBQztBQUN4QyxRQUFBLFVBQVUsR0FBeUIsS0FBSyxDQUFDO0FBQ3pDLFFBQUEsWUFBWSxHQUF1QixLQUFLLENBQUM7QUFDekMsUUFBQSxpQkFBaUIsR0FBa0IsS0FBSyxDQUFDO0FBQ3pDLFFBQUEsc0JBQXNCLEdBQWEsTUFBTSxDQUFDO0FBQzFDLFFBQUEsc0JBQXNCLEdBQWEsTUFBTSxDQUFDO0FBQzFDLFFBQUEsdUJBQXVCLEdBQVksTUFBTSxDQUFDO0FBQzFDLFFBQUEscUJBQXFCLEdBQWMsTUFBTSxDQUFDO0FBQzFDLFFBQUEsMEJBQTBCLEdBQVMsTUFBTSxDQUFDO0FBQzFDLFFBQUEsK0JBQStCLEdBQUksT0FBTyxDQUFDO0FBQzNDLFFBQUEsc0JBQXNCLEdBQWEsT0FBTyxDQUFDO0FBQzNDLFFBQUEsMkJBQTJCLEdBQVEsVUFBVSxDQUFDO0FBQzlDLFFBQUEsdUJBQXVCLEdBQVksVUFBVSxDQUFDO0FBQzlDLFFBQUEsc0JBQXNCLEdBQWEsVUFBVSxDQUFDO0FBQzlDLFFBQUEsb0JBQW9C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