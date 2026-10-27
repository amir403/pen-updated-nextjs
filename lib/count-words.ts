const words=['no','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve'];

/** "eight" for 8 (or "Eight" when capitalised); digits above twelve. */
export function countWord(count:number,capitalise=false){
 const word=words[count]??String(count);
 return capitalise?word.charAt(0).toUpperCase()+word.slice(1):word;
}
