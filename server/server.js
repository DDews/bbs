Meteor.publish("messages", function() {
    var user = Meteor.users.findOne(this.userId);
    if (user == null) return null;
    return Messages.find({
        showTo:{$elemMatch:{$eq:user.username}},
        $or: [
            { to: user.username },
            { from: user.username }
        ]
    })
});
var badchars = ["̀","́","̂","̃","̄","̅","̆","̇","̈","̉","̊","̋","̌","̍","̎","̏","̐","̑","̒","̓","̔","̕","̖","̗","̘","̙","̚","̛","̜","̝","̞","̟","̠","̡","̢","̣","̤","̥","̦","̧","̨","̩","̪","̫","̬","̭","̮","̯","̰","̱","̲","̳","̴","̵","̶","̷","̸","̹","̺","̻","̼","̽","̾","̿","̀","́","͂","̓","̈́","ͅ","͆","͇","͈","͉","͊","͋","͌","͍","͎","͏","͐","͑","͒","͓","͔","͕","͖","͗","͘","͙","͚","͛","͜","͝","͞","͟","͠","͡","͢","ͣ","ͤ","ͥ","ͦ","ͧ","ͨ","ͩ","ͪ","ͫ","ͬ","ͭ","ͮ","ͯ","҃","҄","҅","҆","҇","҈","҉","֑","֒","֓","֔","֕","֖","֗","֘","֙","֚","֛","֜","֝","֞","֟","֠","֡","֢","֣","֤","֥","֦","֧","֨","֩","֪","֫","֬","֭","֮","֯","ְ","ֱ","ֲ","ֳ","ִ","ֵ","ֶ","ַ","ָ","ֹ","ֺ","ֻ","ּ","ֽ","ֿ","ׁ","ׂ","ׄ","ׅ","ׇ","ؐ","ؑ","ؒ","ؓ","ؔ","ؕ","ؖ","ؗ","ؘ","ؙ","ؚ","ً","ٌ","ٍ","َ","ُ","ِ","ّ","ْ","ٓ","ٔ","ٕ","ٖ","ٗ","٘","ٙ","ٚ","ٛ","ٜ","ٝ","ٞ","ٟ","ٰ","ۖ","ۗ","ۘ","ۙ","ۚ","ۛ","ۜ","۟","۠","ۡ","ۢ","ۣ","ۤ","ۧ","ۨ","۪","۫","۬","ۭ","ܑ","ܰ","ܱ","ܲ","ܳ","ܴ","ܵ","ܶ","ܷ","ܸ","ܹ","ܺ","ܻ","ܼ","ܽ","ܾ","ܿ","݀","݁","݂","݃","݄","݅","݆","݇","݈","݉","݊","ަ","ާ","ި","ީ","ު","ޫ","ެ","ޭ","ޮ","ޯ","ް","߫","߬","߭","߮","߯","߰","߱","߲","߳","ࠖ","ࠗ","࠘","࠙","ࠛ","ࠜ","ࠝ","ࠞ","ࠟ","ࠠ","ࠡ","ࠢ","ࠣ","ࠥ","ࠦ","ࠧ","ࠩ","ࠪ","ࠫ","ࠬ","࠭","࡙","࡚","࡛","ࣣ","ࣤ","ࣥ","ࣦ","ࣧ","ࣨ","ࣩ","࣪","࣫","࣬","࣭","࣮","࣯","ࣰ","ࣱ","ࣲ","ࣳ","ࣴ","ࣵ","ࣶ","ࣷ","ࣸ","ࣹ","ࣺ","ࣻ","ࣼ","ࣽ","ࣾ","ࣿ","ऀ","ँ","ं","ऺ","़","ु","ू","ृ","ॄ","ॅ","ॆ","े","ै","्","॑","॒","॓","॔","ॕ","ॖ","ॗ","ॢ","ॣ","ঁ","়","ু","ূ","ৃ","ৄ","্","ৢ","ৣ","ਁ","ਂ","਼","ੁ","ੂ","ੇ","ੈ","ੋ","ੌ","੍","ੑ","ੰ","ੱ","ੵ","ઁ","ં","઼","ુ","ૂ","ૃ","ૄ","ૅ","ે","ૈ","્","ૢ","ૣ","ଁ","଼","ି","ୁ","ୂ","ୃ","ୄ","୍","ୖ","ୢ","ୣ","ஂ","ீ","்","ఀ","ా","ి","ీ","ె","ే","ై","ొ","ో","ౌ","్","ౕ","ౖ","ౢ","ౣ","ಁ","಼","ಿ","ೆ","ೌ","್","ೢ","ೣ","ഁ","ു","ൂ","ൃ","ൄ","്","ൢ","ൣ","්","ි","ී","ු","ූ","ั","ิ","ี","ึ","ื","ุ","ู","ฺ","็","่","้","๊","๋","์","ํ","๎","ັ","ິ","ີ","ຶ","ື","ຸ","ູ","ົ","ຼ","່","້","໊","໋","໌","ໍ","༘","༙","༵","༷","༹","ཱ","ི","ཱི","ུ","ཱུ","ྲྀ","ཷ","ླྀ","ཹ","ེ","ཻ","ོ","ཽ","ཾ","ྀ","ཱྀ","ྂ","ྃ","྄","྆","྇","ྍ","ྎ","ྏ","ྐ","ྑ","ྒ","ྒྷ","ྔ","ྕ","ྖ","ྗ","ྙ","ྚ","ྛ","ྜ","ྜྷ","ྞ","ྟ","ྠ","ྡ","ྡྷ","ྣ","ྤ","ྥ","ྦ","ྦྷ","ྨ","ྩ","ྪ","ྫ","ྫྷ","ྭ","ྮ","ྯ","ྰ","ྱ","ྲ","ླ","ྴ","ྵ","ྶ","ྷ","ྸ","ྐྵ","ྺ","ྻ","ྼ","࿆","ိ","ီ","ု","ူ","ဲ","ဳ","ဴ","ဵ","ံ","့","္","်","ွ","ှ","ၘ","ၙ","ၞ","ၟ","ၠ","ၱ","ၲ","ၳ","ၴ","ႂ","ႅ","ႆ","ႍ","ႝ","፝","፞","፟","ᜒ","ᜓ","᜔","ᜲ","ᜳ","᜴","ᝒ","ᝓ","ᝲ","ᝳ","឴","឵","ិ","ី","ឹ","ឺ","ុ","ូ","ួ","ំ","៉","៊","់","៌","៍","៎","៏","័","៑","្","៓","៝","᠋","᠌","᠍","ᢩ","ᤠ","ᤡ","ᤢ","ᤧ","ᤨ","ᤲ","᤹","᤺","᤻","ᨗ","ᨘ","ᨛ","ᩖ","ᩘ","ᩙ","ᩚ","ᩛ","ᩜ","ᩝ","ᩞ","᩠","ᩢ","ᩥ","ᩦ","ᩧ","ᩨ","ᩩ","ᩪ","ᩫ","ᩬ","ᩳ","ᩴ","᩵","᩶","᩷","᩸","᩹","᩺","᩻","᩼","᩿","᪰","᪱","᪲","᪳","᪴","᪵","᪶","᪷","᪸","᪹","᪺","᪻","᪼","᪽","᪾","ᬀ","ᬁ","ᬂ","ᬃ","᬴","ᬶ","ᬷ","ᬸ","ᬹ","ᬺ","ᬼ","ᭂ","᭫","᭬","᭭","᭮","᭯","᭰","᭱","᭲","᭳","ᮀ","ᮁ","ᮢ","ᮣ","ᮤ","ᮥ","ᮨ","ᮩ","᮫","ᮬ","ᮭ","᯦","ᯨ","ᯩ","ᯭ","ᯯ","ᯰ","ᯱ","ᰬ","ᰭ","ᰮ","ᰯ","ᰰ","ᰱ","ᰲ","ᰳ","ᰶ","᰷","᳐","᳑","᳒","᳔","᳕","᳖","᳗","᳘","᳙","᳚","᳛","᳜","᳝","᳞","᳟","᳠","᳢","᳣","᳤","᳥","᳦","᳧","᳨","᳭","᳴","᳸","᳹","᷀","᷁","᷂","᷃","᷄","᷅","᷆","᷇","᷈","᷉","᷊","᷋","᷌","᷍","᷎","᷏","᷐","᷑","᷒","ᷓ","ᷔ","ᷕ","ᷖ","ᷗ","ᷘ","ᷙ","ᷚ","ᷛ","ᷜ","ᷝ","ᷞ","ᷟ","ᷠ","ᷡ","ᷢ","ᷣ","ᷤ","ᷥ","ᷦ","ᷧ","ᷨ","ᷩ","ᷪ","ᷫ","ᷬ","ᷭ","ᷮ","ᷯ","ᷰ","ᷱ","ᷲ","ᷳ","ᷴ","᷵","᷼","᷽","᷾","᷿","⃐","⃑","⃒","⃓","⃔","⃕","⃖","⃗","⃘","⃙","⃚","⃛","⃜","⃝","⃞","⃟","⃠","⃡","⃢","⃣","⃤","⃥","⃦","⃧","⃨","⃩","⃪","⃫","⃬","⃭","⃮","⃯","⃰","⳯","⳰","⳱","⵿","ⷠ","ⷡ","ⷢ","ⷣ","ⷤ","ⷥ","ⷦ","ⷧ","ⷨ","ⷩ","ⷪ","ⷫ","ⷬ","ⷭ","ⷮ","ⷯ","ⷰ","ⷱ","ⷲ","ⷳ","ⷴ","ⷵ","ⷶ","ⷷ","ⷸ","ⷹ","ⷺ","ⷻ","ⷼ","ⷽ","ⷾ","ⷿ","〪","〫","〬","〭","゙","゚","꙯","꙰","꙱","꙲","ꙴ","ꙵ","ꙶ","ꙷ","ꙸ","ꙹ","ꙺ","ꙻ","꙼","꙽","ꚞ","ꚟ","꛰","꛱","ꠂ","꠆","ꠋ","ꠥ","ꠦ","꣄","꣠","꣡","꣢","꣣","꣤","꣥","꣦","꣧","꣨","꣩","꣪","꣫","꣬","꣭","꣮","꣯","꣰","꣱","ꤦ","ꤧ","ꤨ","ꤩ","ꤪ","꤫","꤬","꤭","ꥇ","ꥈ","ꥉ","ꥊ","ꥋ","ꥌ","ꥍ","ꥎ","ꥏ","ꥐ","ꥑ","ꦀ","ꦁ","ꦂ","꦳","ꦶ","ꦷ","ꦸ","ꦹ","ꦼ","ꧥ","ꨩ","ꨪ","ꨫ","ꨬ","ꨭ","ꨮ","ꨱ","ꨲ","ꨵ","ꨶ","ꩃ","ꩌ","ꩼ","ꪰ","ꪲ","ꪳ","ꪴ","ꪷ","ꪸ","ꪾ","꪿","꫁","ꫬ","ꫭ","꫶","ꯥ","ꯨ","꯭","ﬞ","︀","︁","︂","︃","︄","︅","︆","︇","︈","︉","︊","︋","︌","︍","︎","️","︠","︡","︢","︣","︤","︥","︦","︧","︨","︩","︪","︫","︬","︭","︮","︯","𐇽","𐋠","𐍶","𐍷","𐍸","𐍹","𐍺","𐨁","𐨂","𐨃","𐨅","𐨆","𐨌","𐨍","𐨎","𐨏","𐨸","𐨹","𐨺","𐨿","𐫥","𐫦","𑀁","𑀸","𑀹","𑀺","𑀻","𑀼","𑀽","𑀾","𑀿","𑁀","𑁁","𑁂","𑁃","𑁄","𑁅","𑁆","𑁿","𑂀","𑂁","𑂳","𑂴","𑂵","𑂶","𑂹","𑂺","𑄀","𑄁","𑄂","𑄧","𑄨","𑄩","𑄪","𑄫","𑄭","𑄮","𑄯","𑄰","𑄱","𑄲","𑄳","𑄴","𑅳","𑆀","𑆁","𑆶","𑆷","𑆸","𑆹","𑆺","𑆻","𑆼","𑆽","𑆾","𑇊","𑇋","𑇌","𑈯","𑈰","𑈱","𑈴","𑈶","𑈷","𑋟","𑋣","𑋤","𑋥","𑋦","𑋧","𑋨","𑋩","𑋪","𑌀","𑌁","𑌼","𑍀","𑍦","𑍧","𑍨","𑍩","𑍪","𑍫","𑍬","𑍰","𑍱","𑍲","𑍳","𑍴","𑒳","𑒴","𑒵","𑒶","𑒷","𑒸","𑒺","𑒿","𑓀","𑓂","𑓃","𑖲","𑖳","𑖴","𑖵","𑖼","𑖽","𑖿","𑗀","𑗜","𑗝","𑘳","𑘴","𑘵","𑘶","𑘷","𑘸","𑘹","𑘺","𑘽","𑘿","𑙀","𑚫","𑚭","𑚰","𑚱","𑚲","𑚳","𑚴","𑚵","𑚷","𑜝","𑜞","𑜟","𑜢","𑜣","𑜤","𑜥","𑜧","𑜨","𑜩","𑜪","𑜫","𖫰","𖫱","𖫲","𖫳","𖫴","𖬰","𖬱","𖬲","𖬳","𖬴","𖬵","𖬶","𖾏","𖾐","𖾑","𖾒","𛲝","𛲞","𝅧","𝅨","𝅩","𝅻","𝅼","𝅽","𝅾","𝅿","𝆀","𝆁","𝆂","𝆅","𝆆","𝆇","𝆈","𝆉","𝆊","𝆋","𝆪","𝆫","𝆬","𝆭","𝉂","𝉃","𝉄","𝨀","𝨁","𝨂","𝨃","𝨄","𝨅","𝨆","𝨇","𝨈","𝨉","𝨊","𝨋","𝨌","𝨍","𝨎","𝨏","𝨐","𝨑","𝨒","𝨓","𝨔","𝨕","𝨖","𝨗","𝨘","𝨙","𝨚","𝨛","𝨜","𝨝","𝨞","𝨟","𝨠","𝨡","𝨢","𝨣","𝨤","𝨥","𝨦","𝨧","𝨨","𝨩","𝨪","𝨫","𝨬","𝨭","𝨮","𝨯","𝨰","𝨱","𝨲","𝨳","𝨴","𝨵","𝨶","𝨻","𝨼","𝨽","𝨾","𝨿","𝩀","𝩁","𝩂","𝩃","𝩄","𝩅","𝩆","𝩇","𝩈","𝩉","𝩊","𝩋","𝩌","𝩍","𝩎","𝩏","𝩐","𝩑","𝩒","𝩓","𝩔","𝩕","𝩖","𝩗","𝩘","𝩙","𝩚","𝩛","𝩜","𝩝","𝩞","𝩟","𝩠","𝩡","𝩢","𝩣","𝩤","𝩥","𝩦","𝩧","𝩨","𝩩","𝩪","𝩫","𝩬","𝩵","𝪄","𝪛","𝪜","𝪝","𝪞","𝪟","𝪡","𝪢","𝪣","𝪤","𝪥","𝪦","𝪧","𝪨","𝪩","𝪪","𝪫","𝪬","𝪭","𝪮","𝪯","𞣐","𞣑","𞣒","𞣓","𞣔","𞣕","𞣖","󠄀","󠄁","󠄂","󠄃","󠄄","󠄅","󠄆","󠄇","󠄈","󠄉","󠄊","󠄋","󠄌","󠄍","󠄎","󠄏","󠄐","󠄑","󠄒","󠄓","󠄔","󠄕","󠄖","󠄗","󠄘","󠄙","󠄚","󠄛","󠄜","󠄝","󠄞","󠄟","󠄠","󠄡","󠄢","󠄣","󠄤","󠄥","󠄦","󠄧","󠄨","󠄩","󠄪","󠄫","󠄬","󠄭","󠄮","󠄯","󠄰","󠄱","󠄲","󠄳","󠄴","󠄵","󠄶","󠄷","󠄸","󠄹","󠄺","󠄻","󠄼","󠄽","󠄾","󠄿","󠅀","󠅁","󠅂","󠅃","󠅄","󠅅","󠅆","󠅇","󠅈","󠅉","󠅊","󠅋","󠅌","󠅍","󠅎","󠅏","󠅐","󠅑","󠅒","󠅓","󠅔","󠅕","󠅖","󠅗","󠅘","󠅙","󠅚","󠅛","󠅜","󠅝","󠅞","󠅟","󠅠","󠅡","󠅢","󠅣","󠅤","󠅥","󠅦","󠅧","󠅨","󠅩","󠅪","󠅫","󠅬","󠅭","󠅮","󠅯","󠅰","󠅱","󠅲","󠅳","󠅴","󠅵","󠅶","󠅷","󠅸","󠅹","󠅺","󠅻","󠅼","󠅽","󠅾","󠅿","󠆀","󠆁","󠆂","󠆃","󠆄","󠆅","󠆆","󠆇","󠆈","󠆉","󠆊","󠆋","󠆌","󠆍","󠆎","󠆏","󠆐","󠆑","󠆒","󠆓","󠆔","󠆕","󠆖","󠆗","󠆘","󠆙","󠆚","󠆛","󠆜","󠆝","󠆞","󠆟","󠆠","󠆡","󠆢","󠆣","󠆤","󠆥","󠆦","󠆧","󠆨","󠆩","󠆪","󠆫","󠆬","󠆭","󠆮","󠆯","󠆰","󠆱","󠆲","󠆳","󠆴","󠆵","󠆶","󠆷","󠆸","󠆹","󠆺","󠆻","󠆼","󠆽","󠆾","󠆿","󠇀","󠇁","󠇂","󠇃","󠇄","󠇅","󠇆","󠇇","󠇈","󠇉","󠇊","󠇋","󠇌","󠇍","󠇎","󠇏","󠇐","󠇑","󠇒","󠇓","󠇔","󠇕","󠇖","󠇗","󠇘","󠇙","󠇚","󠇛","󠇜","󠇝","󠇞","󠇟","󠇠","󠇡","󠇢","󠇣","󠇤","󠇥","󠇦","󠇧","󠇨","󠇩","󠇪","󠇫","󠇬","󠇭","󠇮","󠇯"];
var isZalgo = function(string) {
    return string.match(RegExp(badchars.join('|')));
}
Meteor.publish("usernames", function() {
   return Meteor.users.find({},{fields: {'username': 1}})
});
Meteor.publish("userinfo", function() {
   return Userinfo.find();
});
Meteor.publish("topics", function() {
    return Topics.find();
})
Meteor.publish("threads", function() {
    return Threads.find();
});
Meteor.publish("posts", function() {
    return Posts.find();
});
Accounts.validateNewUser(function (user) {
    var matches = user.username.match(/[a-zA-Z][a-zA-Z0-9]*/);
    if (user.username && matches != null && matches.length <= 1)
        return true;
    throw new Meteor.Error(403, "Username must start with a letter and only contain numbers and letters.");
});
Meteor.startup(function() {
    reCAPTCHA.config({
        privatekey: '6LctbBkTAAAAAD2KnAh9vOiLS0JKM-coZFYV9l4X'
    });
    if (!Meteor.users.findOne({username: 'admin'})) {
        Accounts.createUser({
            password: 'moondied',
            username: 'admin',
            admin: true,
            createdAt: new Date(),
        });
        Userinfo.insert(
            {
                username: 'admin',
                admin: true,
                posts: 0,
                points: 0
            }
        );
    }
});
Meteor.methods({
    formSubmissionMethod: function(username, password, captchaData) {

        var verifyCaptchaResponse = reCAPTCHA.verifyCaptcha(this.connection.clientAddress, captchaData);

        if (!verifyCaptchaResponse.success) {
            throw new Meteor.Error(422,verifyCaptchaResponse[Object.keys(verifyCaptchaResponse)[1]]);
        } else {
            var response = Accounts.createUser({
                password: password,
                username: username,
                createdAt: new Date(),
            });
            if (!Userinfo.findOne({username: RegExp('^' + username + '$',"i")})) Userinfo.insert(
                {
                    username: username,
                    admin: false,
                    posts: 0,
					totalKarma: 0,
					wallet: {
						karma: 0,
						gold: 100,
					},
                }
            );
        }
    },
    createTopic: function(topic, subject) {
        var username = Meteor.user() && Meteor.user().username;
        if (isZalgo(subject)) throw new Meteor.Error(422,"Error: Zalgo text detected");
        if (!username) throw new Meteor.Error(422, "Error: you must be logged in");
        var isAdmin = Userinfo.findOne({username: username});
        var isAdmin = isAdmin && isAdmin.admin;
        if (!isAdmin) throw new Meteor.Error(422,"Error: unauthorized");
        if (!topic) throw new Meteor.Error(422,"Error: topic is empty");
        var exists = Topics.findOne({topic: RegExp('^' + topic + '$',"i")});
        if (exists) throw new Meteor.Error(422, "Error: topic already exists");
        var topicId;
        Topics.insert(
            {
                topic: topic,
                subject: subject,
                moderators: []
            });
    },
    newThread: function(topicId, subject, message) {
        var topic = Topics.findOne({_id: topicId});
        if (!topic) throw new Meteor.Error(422,"Error: topic doesn't exist");
        if (isZalgo(subject)) throw new Meteor.Error(422,"Error: Zalgo text detected.");
        if (!subject) throw new Meteor.Error(422,"Error: subject is empty");
        if (!message) throw new Meteor.Error(422,"Error: message is empty");
        var username = Meteor.user() && Meteor.user().username;
        if (!username) throw new Meteor.Error(422, "Error: you must be logged in");
        Threads.insert({
                topicId: topicId,
                from: Meteor.user().username,
                createdAt: new Date(),
                subject: subject,
                modified: new Date(),
                views: 0,
                locked: null
            },
            function(err, docsInserted) {
                var _id = docsInserted;
                Posts.insert({
                    threadId: _id,
                    topicId: topicId,
                    subject: subject,
                    from: Meteor.user().username,
                    createdAt: new Date(),
                    editedBy: null,
                    modified: null,
                    post: message,
                    likes: [],
                    dislikes: [],
                });
            });
        var posts = Userinfo.findOne({username: Meteor.user().username});
        posts = posts && posts.posts;
        if (posts == undefined) return;
        posts += 1;
        var userid = Userinfo.findOne({username: Meteor.user().username});
        userid = userid && userid._id;
        if (!userid) return;
        Userinfo.update(userid,{$set:{posts: posts}});
    },
    postReply: function(topicId, threadId, subject, message) {
        var username = Meteor.user() && Meteor.user().username;
        //if (isZalgo(subject) || isZalgo(message)) throw new Meteor.Error(422,"Error: Zalgo text detected.");
        if (!username) throw new Meteor.Error(422, "Error: you must be logged in");
        if (!Topics.findOne({_id: topicId})) throw new Meteor.Error(422,"Error: you are in a deleted topic");
        var thread = Threads.findOne({_id: threadId});
        if (!thread) throw new Meteor.Error(422,"Error: thread does not exist");
        var locked = thread && thread.locked;
        if (locked) throw new Meteor.Error(422, "Error: this thread is locked");
        if (!message) throw new Meteor.Error(422,"Error: message is empty");
        var post = Posts.findOne({threadId: threadId},{sort: {createdAt: 1}});
        if (!post) throw new Meteor.Error(422,"Internal error");
        if (!subject) subject = 'Re: ' + Posts.findOne({threadId: threadId},{sort: {createdAt: 1}}).subject;
        Posts.insert({
            threadId: threadId,
            topicId: topicId,
            subject: subject,
            from: Meteor.user().username,
            createdAt: new Date(),
            editedBy: null,
            modified: null,
            post: message,
            likes: [],
            dislikes: [],
        });
        Threads.update(threadId,{ $set: { modified: new Date()}});
        var posts = Userinfo.findOne({username: Meteor.user().username});
        posts = posts && posts.posts;
        if (posts == undefined) return;
        posts += 1;
        var userid = Userinfo.findOne({username: Meteor.user().username});
        userid = userid && userid._id;
        if (!userid) return;
        Userinfo.update(userid,{$set:{posts: posts}});
    },
    sendPM: function(messageTo, subject, message) {
        if (messageTo == Meteor.user().username) throw new Meteor.Error(422,"Error: cannot send messages to self");
        var messageTo = Meteor.users.findOne({username: RegExp('^' + messageTo + '$',"i")});
        if (isZalgo(subject)) throw new Meteor.Error(422,"Error: Zalgo text detected.");
        if (!messageTo) throw new Meteor.Error(422,"Error: username doesn't exist");
        if(!message) throw new Meteor.Error(422,"Error: message is empty");
        if (!Meteor.user().username) throw new Meteor.Error(422, "Error: you must be logged in");
        var messageTo = messageTo.username;
        Messages.insert(
            {
                to: messageTo,
                from: Meteor.user().username,
                subject: subject,
                createdAt: new Date(),
                modified: new Date(),
                showTo: [messageTo, Meteor.user().username],
                unread: [messageTo],
                messages: [
                    {
                        _id: 0,
                        from: Meteor.user().username,
                        subject: subject,
                        createdAt: new Date(),
                        modified: new Date(),
                        edited: false,
                        message: message
                    }
                ]
            }
        );
    },
    sendPMReply: function(id, subject, message) {
        if (!message) throw new Meteor.Error(422,"Error: Your message is emtpy");
        //if (isZalgo(subject) || isZalgo(message)) throw new Meteor.Error(422,"Error: Zalgo text detected.");
        var msg = Messages.findOne({_id: id});
        var length = msg && msg.showTo.length;
        if (length == 1) throw new Meteor.Error(422, "Error: This thread is locked.");
        var array = msg && msg.messages;
        if (!array) throw new Meteor.Error(422, "Error: thread not found");
        if (!Meteor.user().username) throw new Meteor.Error(422, "Error: you must be logged in");
        array.push({
            _id: array.length,
            from: Meteor.user().username,
            subject: subject,
            createdAt: new Date(),
            modified: new Date(),
            edited: false,
            message: message
        });
        Messages.update(id,{$set: { messages: array}});
        array = msg.unread;
        var user = Meteor.user().username;
        if (msg.to == user) user = msg.from;
        else user = msg.to;
        if (_.contains(array,user)) {
            return;
        }
        else {
            array.push(user);
            Messages.update(id,{$set: { unread: array}});
        }
    },
    markAsRead: function(id) {
        var username = Meteor.user() && Meteor.user().username;
        if (!username) return;
        var array = Messages.findOne({_id: id});
        if (!array) throw new Meteor.Error(422,"Error: thread not found");
        array = array.unread;
        if (!_.contains(array,Meteor.user().username)) {
            return;
        }
        if (_.contains(array,Meteor.user().username)) {
            array = _.without(array,Meteor.user().username);
        } else {
            return;
        }
        Messages.update(id,{ $set: { unread: array}});
    },
    deleteMessage: function(id) {
        var username = Meteor.user() && Meteor.user().username;
        if (!username) throw new Meteor.Error(422, "Error: you must be logged in");
        var array = Messages.findOne({_id: id});
        if (!array) throw new Meteor.Error(422,"Error: message not found");
        array = array.showTo;
        if (array == [] || !_.contains(array,Meteor.user().username)) throw new Meteor.Error(422,"Error: already deleted.");
        array = _.without(array,Meteor.user().username);
        if (array.length <= 0) {
            Messages.remove(id);
            return;
        }
        Messages.update(id,{ $set: { showTo: array}});
    },
    editPost: function(postId,message) {
        var username = Meteor.user() && Meteor.user().username;
        //if (isZalgo(message)) throw new Meteor.Error(422,"Error: Zalgo text detected.");
        if (!username) throw new Meteor.Error(422, "Error: you must be logged in");
        var post = Posts.findOne({_id: postId});
        if (!post) throw new Meteor.Error(422,"Error: post does not exist");
        var threadId = post.threadId;
        var thread = Threads.findOne({_id: threadId});
        if (!thread) throw new Meteor.Error(422,"Error: thread not found");
        var locked = thread.locked;
        if (locked) {
            var username = Meteor.user() && Meteor.user().username;
            if (!username) return;
            var admin = Userinfo.findOne({username: username});
            admin = admin && admin.admin;
            var topicId = thread && thread.topicId;
            var locked = thread.locked;
            topic = Topics.findOne({_id: topicId});
            var moderators = topic && topic.moderators;
            if (locked) locked = false;
            else locked = true;
            if (_.contains(moderators,Meteor.user().username) || admin) {
                console.log(Meteor.user().username + " editing locked post " + post._id);
            }
            else {
                throw new Meteor.Error(422,"Error: Not authorized. Thread is locked.");
            }
        }
        var poster = post.from;
        var user = Meteor.user();
        user = user && user.username;
        var admin = Userinfo.findOne({username: user});
        admin = admin && admin.admin;
        var topic = Topics.findOne({_id: post.topicId});
        topic = topic && topic.moderators;
        if ((_.contains(topic,user)) || (admin) || Meteor.user().username == poster) {
            Posts.update(postId,{$set: { post: message} });
            Posts.update(postId,{$set: { editedBy: Meteor.user().username}});
            Posts.update(postId,{$set: { modified: new Date()}});
        } else {
            throw new Meteor.Error(422,"Error: not authorized");
        }
    },
    increaseView: function(threadId) {
        if (!Threads.findOne({_id: threadId})) return;
        views = Threads.findOne({_id: threadId}).views + 1;
        Threads.update(threadId,{$set: { views: views}});
    },
    editPM: function(id,post_id,msg) {
        if (isZalgo(msg)) throw new Meteor.Error(422,"Error: Zalgo text detected.");
        var username = Meteor.user() && Meteor.user().username;
        if (!username) throw new Meteor.Error(422, "Error: you must be logged in");
        var thispost = Messages.findOne({_id: id});
        if (!thispost) throw new Meteor.Error(422,"Error: thread " + id + "does not exist");
        var array = thispost && thispost.messages;
        if (post_id < 0 || post_id >= array.length) throw new Meteor.Error(422, "Error: post does not exist");
        if (!array) throw new Meteor.Error(422,"Error: thread not found");
        var post = array[post_id];
        post.message = msg;
        post.modified = new Date();
        post.edited = true;
        if (post.from != Meteor.user().username) throw new Meteor.Error(422, "Error: not authorized to edit someone else's post");
        array[post_id] = post;
        Messages.update(id, { $set: { messages: array} });
        array = thispost.unread;
        var user = Meteor.user().username;
        if (msg.to == user) user = thispost.from;
        else user = thispost.to;
        if (_.contains(array,user)) {
            return;
        }
        else {
            array.push(user);
            Messages.update(id,{$set: { unread: array}});
        }
    },
    lockThread: function(id) {
        var username = Meteor.user() && Meteor.user().username;
        if (!username) return;
        var admin = Userinfo.findOne({username: username});
        admin = admin && admin.admin;
        var thread = Threads.findOne({_id: id});
        var topicId = thread && thread.topicId;
        var locked = thread.locked;
        topic = Topics.findOne({_id: topicId});
        var moderators = topic && topic.moderators;
        if (locked) locked = null;
        else locked = Meteor.user().username;
        if (_.contains(moderators,Meteor.user().username) || admin) {
            Threads.update(id,{$set:{locked: locked}});
        }
    },
    deleteThread: function(id) {
        var username = Meteor.user() && Meteor.user().username;
        if (!username) return;
        var admin = Userinfo.findOne({username: username});
        admin = admin && admin.admin;
        if (admin) {
            Posts.remove({threadId: id});
            Threads.remove(id);
        }
        /*var thread = Threads.findOne({_id: id});
        var topicId = thread && thread.topicId;
        topic = Topics.findOne({_id: topicId});
        var moderators = topic && topic.moderators;
        else locked = Meteor.user().username;
        if (_.contains(moderators,Meteor.user().username) || admin) {
            Threads.remove(id);
        }*/
    },
    setSignature: function(signature, password) {
        if (!this.userId) throw new Meteor.Error(422,"You must be logged in");
        if (isZalgo(signature)) throw new Meteor.Error(422, "Zalgo text not allowed.");
        var user = Meteor.user();
        var password = {digest: password, algorithm: 'sha-256'};
        var result = Accounts._checkPassword(user, password);
        var error = result.error;
        if (error != undefined) var reason = error.reason;
        else reason = 0;
        if (reason) throw new Meteor.Error(422,reason);
        var user = Userinfo.findOne({username: Meteor.user().username});
        var userId = user._id;
        console.log(userId);
        Userinfo.update(userId,{$set:{signature: signature}});
        user = Userinfo.findOne({username: Meteor.user().username});
        console.log(user.signature);
    },
    addModerator: function(topicId, username) {
        if (!this.userId) throw new Meteor.Error(422,"You must be logged in");
        var admin = Userinfo.findOne({username: Meteor.user().username});
        admin = admin && admin.admin;
        if (!admin) throw new Meteor.Error(422,"Not authorized");
        var user = Meteor.users.findOne({username: RegExp('^' + username + '$',"i")});
        if (!user) throw new Meteor.Error(422,"User doesn't exist");
        username = user.username;
        var topic = Topics.findOne({_id: topicId});
        if (!topic) throw new Meteor.Error(422,"Topic doesn't exist");
        var array = topic.moderators;
        console.log(_.contains(array,username));
        if (_.contains(array,username)) throw new Meteor.Error(422,'That user is already a moderator');
        array.push(username);
        Topics.update(topicId,{$set:{moderators: array}});
    },
    removeMod: function(topicId, username) {
        if (!this.userId) throw new Meteor.Error(422,"You must be logged in");
        var admin = Userinfo.findOne({username: Meteor.user().username});
        admin = admin && admin.admin;
        if (!admin) throw new Meteor.Error(422,"Not authorized");
        var topic = Topics.findOne({_id: topicId});
        if (!topic) throw new Meteor.Error(422,"Topic not found");
        var moderators = topic.moderators;
        moderators = _.without(moderators,username);
        Topics.update(topicId,{$set:{moderators: moderators}});
    },
    makeAdmin: function(username) {
        if (!this.userId) throw new Meteor.Error(422,"You must be logged in");
        var admin = Userinfo.findOne({username: Meteor.user().username});
        admin = admin && admin.admin;
        if (!admin) throw new Meteor.Error(422,"Not authorized");
        var user = Userinfo.findOne({username: RegExp('^' + username + '$',"i")});
        if (!user) throw new Meteor.Error(422,"User not found");
        var userId = user._id;
        Userinfo.update(userId,{$set:{admin: true}});
    },
    removeAdmin: function(username) {
        if (!this.userId) throw new Meteor.Error(422,"You must be logged in");
        var admin = Userinfo.findOne({username: Meteor.user().username});
        admin = admin && admin.admin;
        if (!admin) throw new Meteor.Error(422,"Not authorized");
        var user = Userinfo.findOne({username: RegExp('^' + username + '$',"i")});
        if (!user) throw new Meteor.Error(422,"User not found");
        var userId = user._id;
        Userinfo.update(userId,{$set:{admin: false}});
    },
	newWallet: function(username) {
		if (!this.userId) throw new Meteor.Error(422,"You must be logged in");
		var user = Userinfo.findOne({username: RegExp('^' + username + '$',"i")});
		
		if (!user) throw new Meteor.Error(422,"User not found");
		
		var userId = user._id;
		var requester = Meteor.user().username;
		if (requester != username) throw new Meteor.Error(422,"Don't be a jerk!");
		
		if (user.wallet) {
			return;
		}
		
		Userinfo.update(userId, {$set:{wallet:{karma:0, gold:100}}})
		
	},
    likePost: function(postId) {
        if (!this.userId) throw new Meteor.Error(422,"You must be logged in");
        var post = Posts.findOne({_id: postId});
        if (!post) throw new Meteor.Error(422,"Post not found");
        var likes = post.likes;
        var dislikes = post.dislikes;
        if (_.contains(likes,Meteor.user().username)) throw new Meteor.Error(422,"User already liked this post");
        if (_.contains(dislikes,Meteor.user().username)) throw new Meteor.Error(422,"User already dislikes this post");
        likes.push(Meteor.user().username);
        Posts.update(postId,{$set:{likes: likes}});
    },
    dislikePost: function(postId) {
        if (!this.userId) throw new Meteor.Error(422,"You must be logged in");
        var post = Posts.findOne({_id: postId});
        if (!post) throw new Meteor.Error(422,"Post not found");
        var likes = post.likes;
        var dislikes = post.dislikes;
        if (_.contains(likes,Meteor.user().username)) throw new Meteor.Error(422,"User already liked this post");
        if (_.contains(dislikes,Meteor.user().username)) throw new Meteor.Error(422,"User already dislikes this post");
        dislikes.push(Meteor.user().username);
        Posts.update(postId,{$set:{dislikes: dislikes}});
    }
});