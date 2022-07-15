
//each node has value and node pointing to next letter
class Node {
    constructor(){
        this.keys = new Map()
        this.lastLetter = false
    }
    endWord(){
        this.lastLetter = true
    }
    islastLetter(){
        return this.lastLetter
    }
}

class trie {
    constructor() {
        this.root = new Node()
    }
    add(word, node = this.root){
        if(word.length === 0){
            node.endWord()
            return
        }
        else {
            if(node.keys.has(word[0])){
                return this.add(word.substr(1), node.keys.get(word[0]))
            }
            else{
                node.keys.set(word[0], new Node())
                return this.add(word.substr(1), node.keys.get(word[0]))
            }
        }
    }

    isWord(word){
        let node = this.root
        while(word.length > 1){
            if(!node.keys.has(word[0])){
                return false
            }
            else{
                node = node.keys.get(word[0])
                word = word.substr(1)
            }
        }
        return (node.keys.has(word) && node.keys.get(word).islastLetter())
    }
    
    print(){
        let words = new Array()
        let search = function(node, string){

            if(node.keys.size != 0){
                for(let letter of node.keys.keys()){
                    search(node.keys.get(letter), string.concat(letter))
                }
                if(node.islastLetter()){
                    words.push(string)
                }
            }
            else {
                string.length > 0 ? words.push(string) : undefined
                return
            }

        }

        search(this.root, new String())
        return words.length > 0 ? words : null

    }
}

let myTrie = new trie()

myTrie.add('ball')
myTrie.add('bat')
myTrie.add('doll')
myTrie.add('dork')
myTrie.add('do')
myTrie.add('dorm')
myTrie.add('send')
myTrie.add('sense')
console.log(myTrie.isWord('doll'))
console.log(myTrie.isWord('dor'))
console.log(myTrie.isWord('dorf'))
console.log(myTrie)
console.log(myTrie.print())