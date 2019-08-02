
class SearchBar {

    constructor(element, index, settings){
        settings = settings || {};
        if(! (index instanceof SearchIndex) )
            throw new Error('Invalid search index. Build one with SearchIndex class.');
        this.index = index;
        this.element = typeof element === 'string'
            ? document.querySelector(element)
            : element;
        this.any = settings.any || false;
        this.delay = settings.delay || 500;
        var timer = null;
        this.element.oninput = () => {
            clearTimeout(timer);
            timer = setTimeout(this.search.bind(this), this.delay);
        };
    }

    toggleElement(element, state){
        clearTimeout(element.domniFadeTimer);
        if(state)
            element.style.display = '';
        else
            element.domniFadeTimer = setTimeout(() => element.style.display = 'none', 300);
        element.offsetLeft;
        element.style.transform = state ? 'scale(1)' : 'scale(0)';
        element.style.opacity = state ? '1' : '0';
    }

    search(string){

        // Assemble Search Regex
        var searchStr = (string || this.element.value).trim();
        if(!this.index.caseSensitive)
            searchStr = searchStr.toLowerCase();

        searchStr = searchStr.replace(/[^A-Za-z\d\s]+/g, '.*');

        if(this.any)
            searchStr = '(' + searchStr.replace(/\s+/g, '|') + ')';

        var regex = new RegExp(searchStr);

        // Grab elements textual data.
        for(var d of this.index.items)
            this.toggleElement(d.element, searchStr ? regex.test(d.text) : true);
    }

}
