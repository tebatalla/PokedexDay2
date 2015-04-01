Pokedex.Views = (Pokedex.Views || {});

Pokedex.Views.PokemonForm = Backbone.View.extend({
  events: {
    "submit form": "savePokemon"
  },

  render: function () {
    var content = JST["pokemonForm"];
    this.$el.html(content);
  },

  savePokemon: function (event) {
    event.preventDefault();
    var params = $(event.currentTarget).serializeJSON()["pokemon"];
    this.model.save(params, {
      success: function () {
        this.collection.add(this.model);
        Backbone.history.navigate('pokemon/' + this.model.id, { trigger: true })
      }.bind(this)
    })
  }
});
