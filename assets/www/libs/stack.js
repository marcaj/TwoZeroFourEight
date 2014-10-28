function Stack(name) {
    this.name = name;
    this.content = JSON.parse(window.localStorage.getItem(this.name)) || new Array();
}
Stack.prototype.push = function(element) {
    this.content.push(element);
    window.localStorage.setItem(this.name, JSON.stringify(this.content));
}
Stack.prototype.pop = function() {
    var pop = this.content.pop();
    window.localStorage.setItem(this.name, JSON.stringify(this.content));
    return pop;
}
Stack.prototype.clear = function() {
    this.content = new Array();
    window.localStorage.setItem(this.name, JSON.stringify(this.content));
}
