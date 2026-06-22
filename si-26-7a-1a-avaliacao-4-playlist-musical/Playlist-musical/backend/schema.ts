export const typeDefs = `#graphql
  type Artista {
    id: ID!
    nome: String!
    generoMusical: String!
  }

  type Album {
    id: ID!
    titulo: String!
    ano: Int!
    idArtista: ID!
    artista: Artista
  }

  type Musica {
    id: ID!
    titulo: String!
    duracao: String!
    idArtista: ID!
    idAlbum: ID!
    artista: Artista
    album: Album
  }

  type Playlist {
    id: ID!
    nome: String!
    descricao: String!
    musicas: [Musica]
  }

  type Query {
    artistas: [Artista]
    artista(id: ID!): Artista
    albuns: [Album]
    album(id: ID!): Album
    musicas: [Musica]
    musica(id: ID!): Musica
    playlists: [Playlist]
    playlist(id: ID!): Playlist
  }

  type Mutation {
    criarArtista(nome: String!, generoMusical: String!): Artista
    atualizarArtista(id: ID!, nome: String!, generoMusical: String!): Artista
    deletarArtista(id: ID!): String

    criarAlbum(titulo: String!, ano: Int!, idArtista: ID!): Album
    atualizarAlbum(id: ID!, titulo: String!, ano: Int!, idArtista: ID!): Album
    deletarAlbum(id: ID!): String

    criarMusica(titulo: String!, duracao: String!, idArtista: ID!, idAlbum: ID!): Musica
    atualizarMusica(id: ID!, titulo: String!, duracao: String!, idArtista: ID!, idAlbum: ID!): Musica
    deletarMusica(id: ID!): String

    criarPlaylist(nome: String!, descricao: String!, musicas: [ID!]): Playlist
    atualizarPlaylist(id: ID!, nome: String!, descricao: String!, musicas: [ID!]): Playlist
    deletarPlaylist(id: ID!): String
  }
`;
