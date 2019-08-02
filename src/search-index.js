
class SearchIndex {

    constructor(selector, caseSensitive){
        this.selector = selector;
        this.caseSensitive = Boolean(caseSensitive);
        this.refresh();
    }

    refresh(){
        this.items = Array.from(document.querySelectorAll(this.selector)).map( e => {
            let t = e.innerText.replace(/\s+/g, ' ');
            if(!this.caseSensitive)
                t = t.toLowerCase();
            return { text: t, element: e }
        });
    }

}