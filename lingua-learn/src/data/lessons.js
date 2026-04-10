export const LANGUAGES = [
  { code: 'es', name: 'Spanish', flag: '🇪🇸', color: '#C0392B' },
  { code: 'fr', name: 'French', flag: '🇫🇷', color: '#2C3E80' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵', color: '#E74C3C' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳', color: '#F39C12' },
];

export const CATEGORIES = ['Vocabulary', 'Grammar', 'Phrases'];

export const LESSONS = {
  es: {
    Vocabulary: [
      { id: 1, word: 'Casa', translation: 'House', pronunciation: 'KAH-sah', example: 'Mi casa es grande.', exampleTranslation: 'My house is big.' },
      { id: 2, word: 'Agua', translation: 'Water', pronunciation: 'AH-gwah', example: 'Quiero agua, por favor.', exampleTranslation: 'I want water, please.' },
      { id: 3, word: 'Libro', translation: 'Book', pronunciation: 'LEE-broh', example: 'Este libro es interesante.', exampleTranslation: 'This book is interesting.' },
      { id: 4, word: 'Perro', translation: 'Dog', pronunciation: 'PEH-rroh', example: 'El perro es amistoso.', exampleTranslation: 'The dog is friendly.' },
      { id: 5, word: 'Sol', translation: 'Sun', pronunciation: 'SOHL', example: 'El sol brilla hoy.', exampleTranslation: 'The sun shines today.' },
      { id: 6, word: 'Luna', translation: 'Moon', pronunciation: 'LOO-nah', example: 'La luna está llena.', exampleTranslation: 'The moon is full.' },
      { id: 7, word: 'Amigo', translation: 'Friend', pronunciation: 'ah-MEE-goh', example: 'Él es mi amigo.', exampleTranslation: 'He is my friend.' },
      { id: 8, word: 'Ciudad', translation: 'City', pronunciation: 'syoo-DAHD', example: 'Me gusta esta ciudad.', exampleTranslation: 'I like this city.' },
    ],
    Grammar: [
      { id: 9, word: 'Ser vs Estar', translation: 'Two forms of "to be"', pronunciation: 'SEHR / ehs-TAHR', example: 'Soy feliz. Estoy aquí.', exampleTranslation: 'I am happy (permanent). I am here (temporary).' },
      { id: 10, word: 'El/La', translation: 'The (masculine/feminine)', pronunciation: 'EHL / LAH', example: 'El gato, la gata.', exampleTranslation: 'The male cat, the female cat.' },
      { id: 11, word: 'Querer', translation: 'To want', pronunciation: 'keh-REHR', example: 'Yo quiero comer.', exampleTranslation: 'I want to eat.' },
      { id: 12, word: 'Plural -s/-es', translation: 'Plural rule', pronunciation: '', example: 'Un libro → libros. Un árbol → árboles.', exampleTranslation: 'One book → books. One tree → trees.' },
      { id: 13, word: 'Negation: No', translation: 'Negation particle', pronunciation: 'NOH', example: 'No me gusta.', exampleTranslation: 'I do not like it.' },
    ],
    Phrases: [
      { id: 14, word: '¿Cómo estás?', translation: 'How are you?', pronunciation: 'KOH-moh ehs-TAHS', example: '¡Hola! ¿Cómo estás?', exampleTranslation: 'Hello! How are you?' },
      { id: 15, word: 'Muchas gracias', translation: 'Thank you very much', pronunciation: 'MOO-chahs GRAH-syahs', example: 'Muchas gracias por tu ayuda.', exampleTranslation: 'Thank you very much for your help.' },
      { id: 16, word: '¿Dónde está...?', translation: 'Where is...?', pronunciation: 'DOHN-deh ehs-TAH', example: '¿Dónde está el baño?', exampleTranslation: 'Where is the bathroom?' },
      { id: 17, word: 'Me llamo...', translation: 'My name is...', pronunciation: 'meh YAH-moh', example: 'Me llamo Carlos.', exampleTranslation: 'My name is Carlos.' },
      { id: 18, word: 'No entiendo', translation: "I don't understand", pronunciation: 'noh ehn-TYEHN-doh', example: 'Lo siento, no entiendo.', exampleTranslation: "Sorry, I don't understand." },
    ],
  },
  fr: {
    Vocabulary: [
      { id: 1, word: 'Maison', translation: 'House', pronunciation: 'meh-ZOH', example: 'Ma maison est belle.', exampleTranslation: 'My house is beautiful.' },
      { id: 2, word: 'Eau', translation: 'Water', pronunciation: 'OH', example: "Je voudrais de l'eau.", exampleTranslation: 'I would like some water.' },
      { id: 3, word: 'Livre', translation: 'Book', pronunciation: 'LEEVR', example: 'Ce livre est intéressant.', exampleTranslation: 'This book is interesting.' },
      { id: 4, word: 'Chien', translation: 'Dog', pronunciation: 'SHYAN', example: 'Le chien est mignon.', exampleTranslation: 'The dog is cute.' },
      { id: 5, word: 'Soleil', translation: 'Sun', pronunciation: 'soh-LAY', example: 'Le soleil brille.', exampleTranslation: 'The sun shines.' },
      { id: 6, word: 'Lune', translation: 'Moon', pronunciation: 'LOON', example: 'La lune est pleine.', exampleTranslation: 'The moon is full.' },
      { id: 7, word: 'Ami', translation: 'Friend', pronunciation: 'ah-MEE', example: "C'est mon ami.", exampleTranslation: 'He is my friend.' },
      { id: 8, word: 'Ville', translation: 'City', pronunciation: 'VEEL', example: "J'aime cette ville.", exampleTranslation: 'I love this city.' },
    ],
    Grammar: [
      { id: 9, word: 'Le/La/Les', translation: 'Definite articles', pronunciation: 'luh / lah / lay', example: 'Le chat, la voiture, les enfants.', exampleTranslation: 'The cat, the car, the children.' },
      { id: 10, word: 'Être', translation: 'To be', pronunciation: 'EHT-ruh', example: 'Je suis étudiant.', exampleTranslation: 'I am a student.' },
      { id: 11, word: 'Avoir', translation: 'To have', pronunciation: 'ah-VWAHR', example: "J'ai un livre.", exampleTranslation: 'I have a book.' },
      { id: 12, word: 'Ne...pas', translation: 'Negation structure', pronunciation: 'nuh...PAH', example: 'Je ne parle pas anglais.', exampleTranslation: "I don't speak English." },
      { id: 13, word: 'Vouloir', translation: 'To want', pronunciation: 'voo-LWAHR', example: 'Je veux manger.', exampleTranslation: 'I want to eat.' },
    ],
    Phrases: [
      { id: 14, word: 'Comment allez-vous?', translation: 'How are you?', pronunciation: 'koh-MON tah-LAY VOO', example: 'Bonjour! Comment allez-vous?', exampleTranslation: 'Hello! How are you?' },
      { id: 15, word: 'Merci beaucoup', translation: 'Thank you very much', pronunciation: 'mehr-SEE boh-KOO', example: 'Merci beaucoup pour votre aide.', exampleTranslation: 'Thank you very much for your help.' },
      { id: 16, word: 'Où est...?', translation: 'Where is...?', pronunciation: 'OO EH', example: 'Où est la gare?', exampleTranslation: 'Where is the station?' },
      { id: 17, word: "Je m'appelle...", translation: 'My name is...', pronunciation: "zhuh mah-PEHL", example: "Je m'appelle Marie.", exampleTranslation: 'My name is Marie.' },
      { id: 18, word: 'Je ne comprends pas', translation: "I don't understand", pronunciation: 'zhuh nuh kohn-PROHN PAH', example: "Désolé, je ne comprends pas.", exampleTranslation: "Sorry, I don't understand." },
    ],
  },
  ja: {
    Vocabulary: [
      { id: 1, word: '家 (Ie)', translation: 'House', pronunciation: 'ee-EH', example: '私の家は大きいです。', exampleTranslation: 'My house is big.' },
      { id: 2, word: '水 (Mizu)', translation: 'Water', pronunciation: 'mee-ZOO', example: '水をください。', exampleTranslation: 'Please give me water.' },
      { id: 3, word: '本 (Hon)', translation: 'Book', pronunciation: 'HOHN', example: 'この本はおもしろいです。', exampleTranslation: 'This book is interesting.' },
      { id: 4, word: '犬 (Inu)', translation: 'Dog', pronunciation: 'ee-NOO', example: '犬が好きです。', exampleTranslation: 'I like dogs.' },
      { id: 5, word: '太陽 (Taiyō)', translation: 'Sun', pronunciation: 'tie-YOH', example: '太陽が出ています。', exampleTranslation: 'The sun is out.' },
      { id: 6, word: '月 (Tsuki)', translation: 'Moon', pronunciation: 'TSOO-kee', example: '月がきれいです。', exampleTranslation: 'The moon is beautiful.' },
      { id: 7, word: '友達 (Tomodachi)', translation: 'Friend', pronunciation: 'toh-moh-DAH-chee', example: '彼は友達です。', exampleTranslation: 'He is my friend.' },
      { id: 8, word: '都市 (Toshi)', translation: 'City', pronunciation: 'TOH-shee', example: 'この都市が好きです。', exampleTranslation: 'I like this city.' },
    ],
    Grammar: [
      { id: 9, word: 'です (Desu)', translation: 'To be / Polite ending', pronunciation: 'DEH-soo', example: '私は学生です。', exampleTranslation: 'I am a student.' },
      { id: 10, word: 'は (Wa)', translation: 'Topic marker particle', pronunciation: 'WAH', example: '私はマリアです。', exampleTranslation: 'I am Maria.' },
      { id: 11, word: 'を (Wo)', translation: 'Object marker particle', pronunciation: 'OH', example: '本を読みます。', exampleTranslation: 'I read a book.' },
      { id: 12, word: 'ません (Masen)', translation: 'Negative polite ending', pronunciation: 'mah-SEN', example: '分かりません。', exampleTranslation: "I don't understand." },
      { id: 13, word: 'てください (Te kudasai)', translation: 'Please do...', pronunciation: 'teh-koo-dah-SAI', example: '来てください。', exampleTranslation: 'Please come.' },
    ],
    Phrases: [
      { id: 14, word: 'お元気ですか？', translation: 'How are you?', pronunciation: 'oh-GEN-kee deh-soo-KAH', example: 'こんにちは！お元気ですか？', exampleTranslation: 'Hello! How are you?' },
      { id: 15, word: 'ありがとうございます', translation: 'Thank you very much', pronunciation: 'ah-ree-gah-TOH goh-zai-mahs', example: '助けてくれてありがとうございます。', exampleTranslation: 'Thank you for helping me.' },
      { id: 16, word: '...はどこですか？', translation: 'Where is...?', pronunciation: 'wa doh-koh deh-soo-KAH', example: 'トイレはどこですか？', exampleTranslation: 'Where is the bathroom?' },
      { id: 17, word: '私の名前は...', translation: 'My name is...', pronunciation: 'wah-TAH-shee noh nah-meh-wah', example: '私の名前は田中です。', exampleTranslation: 'My name is Tanaka.' },
      { id: 18, word: '分かりません', translation: "I don't understand", pronunciation: 'wah-kah-ree-mah-SEN', example: 'すみません、分かりません。', exampleTranslation: "Excuse me, I don't understand." },
    ],
  },
  hi: {
    Vocabulary: [
      { id: 1, word: 'घर (Ghar)', translation: 'House', pronunciation: 'GHUR', example: 'मेरा घर बड़ा है।', exampleTranslation: 'My house is big.' },
      { id: 2, word: 'पानी (Paani)', translation: 'Water', pronunciation: 'PAH-nee', example: 'मुझे पानी चाहिए।', exampleTranslation: 'I need water.' },
      { id: 3, word: 'किताब (Kitaab)', translation: 'Book', pronunciation: 'ki-TAAB', example: 'यह किताब रोचक है।', exampleTranslation: 'This book is interesting.' },
      { id: 4, word: 'कुत्ता (Kutta)', translation: 'Dog', pronunciation: 'KUT-tah', example: 'कुत्ता प्यारा है।', exampleTranslation: 'The dog is cute.' },
      { id: 5, word: 'सूरज (Suraj)', translation: 'Sun', pronunciation: 'SOO-raj', example: 'सूरज चमक रहा है।', exampleTranslation: 'The sun is shining.' },
      { id: 6, word: 'चाँद (Chaand)', translation: 'Moon', pronunciation: 'CHAAND', example: 'चाँद सुंदर है।', exampleTranslation: 'The moon is beautiful.' },
      { id: 7, word: 'दोस्त (Dost)', translation: 'Friend', pronunciation: 'DOHST', example: 'वह मेरा दोस्त है।', exampleTranslation: 'He is my friend.' },
      { id: 8, word: 'शहर (Shahar)', translation: 'City', pronunciation: 'sha-HAR', example: 'यह शहर अच्छा है।', exampleTranslation: 'This city is good.' },
    ],
    Grammar: [
      { id: 9, word: 'है / हैं (Hai/Hain)', translation: 'Is / Are', pronunciation: 'HAI / HAIN', example: 'मैं छात्र हूँ। वे छात्र हैं।', exampleTranslation: 'I am a student. They are students.' },
      { id: 10, word: 'का/की/के (Ka/Ki/Ke)', translation: 'Possessive markers', pronunciation: 'KAH / KEE / KAY', example: "राम का घर, सीता की किताब।", exampleTranslation: "Ram's house, Seeta's book." },
      { id: 11, word: 'मुझे (Mujhe)', translation: 'To me / I need', pronunciation: 'moo-JHAY', example: 'मुझे खाना चाहिए।', exampleTranslation: 'I need food.' },
      { id: 12, word: 'नहीं (Nahin)', translation: 'No / Not', pronunciation: 'nah-HEEN', example: 'मैं नहीं जाऊंगा।', exampleTranslation: 'I will not go.' },
      { id: 13, word: 'करना (Karna)', translation: 'To do', pronunciation: 'KAR-nah', example: 'मुझे काम करना है।', exampleTranslation: 'I have to work.' },
    ],
    Phrases: [
      { id: 14, word: 'आप कैसे हैं?', translation: 'How are you?', pronunciation: 'aap KAI-say hain', example: 'नमस्ते! आप कैसे हैं?', exampleTranslation: 'Hello! How are you?' },
      { id: 15, word: 'बहुत धन्यवाद', translation: 'Thank you very much', pronunciation: 'buh-HOT dhun-YAH-vaad', example: 'मदद के लिए बहुत धन्यवाद।', exampleTranslation: 'Thank you very much for the help.' },
      { id: 16, word: '...कहाँ है?', translation: 'Where is...?', pronunciation: 'ka-HAAN hai', example: 'शौचालय कहाँ है?', exampleTranslation: 'Where is the bathroom?' },
      { id: 17, word: 'मेरा नाम... है', translation: 'My name is...', pronunciation: 'MEH-rah naam... hai', example: 'मेरा नाम अनन्या है।', exampleTranslation: 'My name is Ananya.' },
      { id: 18, word: 'मुझे समझ नहीं आया', translation: "I don't understand", pronunciation: 'moo-JHAY sam-UJ na-HEEN aa-YAH', example: 'माफ़ करें, मुझे समझ नहीं आया।', exampleTranslation: "Sorry, I don't understand." },
    ],
  },
};
