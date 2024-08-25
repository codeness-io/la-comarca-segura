
export type NewsType = {
  position: number,
  title: string,
  source: {
    name: string,
    icon: string
  },
  link: string,
  thumbnail: string,
  date: string
}

export async function getTopNews(): Promise<NewsType[]> {
  return new Promise((resolve) => {
    resolve([
        {
          "position": 1,
          "title": "Las inundaciones y lluvias en Chile dañan un centenar de casas y afectan a miles de personas",
          "source": {
            "name": "EL PAÍS",
            "icon": "https://encrypted-tbn1.gstatic.com/faviconV2?url=https://elpais.com&client=NEWS_360&size=96&type=FAVICON&fallback_opts=TYPE,SIZE,URL"
          },
          "link": "https://elpais.com/chile/2024-06-12/las-inundaciones-y-lluvias-en-chile-danan-un-centenar-de-casas-y-afectan-a-miles-de-personas.html",
          "thumbnail": "https://imagenes.elpais.com/resizer/v2/https%3A%2F%2Fcloudfront-eu-central-1.images.arcpublishing.com%2Fprisa%2FJYH5DKLSZU5ULBA4OMRWITMO7A.jpg?auth=fc36e3e44ecbe9b92996a670c89a2e4231194af027659df7edb17e4d6406500e&width=1960&height=1103&smart=true",
          "date": "06/12/2024"
        },
        {
          "position": 2,
          "title": "El sur de Chile sufre inundaciones y fuertes lluvias, y el gobierno decreta catástrofe",
          "source": {
            "name": "Voz de América",
            "icon": "https://encrypted-tbn1.gstatic.com/faviconV2?url=https://www.vozdeamerica.com&client=NEWS_360&size=96&type=FAVICON&fallback_opts=TYPE,SIZE,URL"
          },
          "link": "https://www.vozdeamerica.com/a/sur-chile-sufre-inundaciones-fuertes-lluvias-gobierno-decreta-catastrofe/7653201.html",
          "thumbnail": "https://gdb.voanews.com/055d2b3f-36e7-4db8-8842-4dff31b4c3a6_w1080_h608_s.jpg",
          "date": "06/12/2024"
        },
        {
          "position": 3,
          "title": "Chile: seis regiones en alerta máxima por intensas lluvias",
          "source": {
            "name": "FRANCE 24 Español",
            "icon": "https://encrypted-tbn2.gstatic.com/faviconV2?url=https://www.france24.com&client=NEWS_360&size=96&type=FAVICON&fallback_opts=TYPE,SIZE,URL"
          },
          "link": "https://www.france24.com/es/minuto-a-minuto/20240613-centro-y-sur-de-chile-en-alerta-m%C3%A1xima-por-llegada-de-intensas-lluvias",
          "thumbnail": "https://s.france24.com/media/display/da048de2-2928-11ef-b96b-005056a97e36/w:980/p:16x9/000_34WK3LR.jpg",
          "date": "06/13/2024"
        }
    ])
  })
}
