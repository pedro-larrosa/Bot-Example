const fs = require("fs");
const prefix = require("..");
const geolib = require("geolib");

const coordenadas = JSON.parse(
    fs.readFileSync(__dirname + "/../localidades.json", "utf-8")
);

const normalizar = (s) => {
    s = s.toLowerCase();

    if (!s.includes(" ")) {
        return s.replace(s[0], s[0].toUpperCase());
    }

    let splited = s.split(" ").map((word) => {
        if (word !== "de") {
            return word.replace(word[0], word[0].toUpperCase());
        }

        return word;
    });

    return splited.reduce((prev, word) => (prev += " " + word));
};

const getDistanceBetween = (p1, p2) => {
    return geolib
        .convertDistance(
            geolib.getDistance(
                {
                    latitude: coordenadas[p1].latitud,
                    longitude: coordenadas[p1].longitud
                },
                {
                    latitude: coordenadas[p2].latitud,
                    longitude: coordenadas[p2].longitud
                }
            ),
            "km"
        )
        .toFixed(2);
};

module.exports = {
    name: "messageCreate",
    once: false,
    async execute(message) {
        if (message.author.bot) return;

        if (message.content.startsWith(`${prefix}distancia`)) {
            let parametros = message.content
                .replace(`${prefix}distancia `, "")
                .split("-");

            if (parametros.length !== 2) {
                message.channel.send(
                    "Debes de introducir los parámetros de la forma adecuada"
                );
                message.channel.send("---------------------------");
                message.channel.send("Parámetro 1-Parámetro2");

                return;
            }

            parametros[0] = normalizar(parametros[0]);
            parametros[1] = normalizar(parametros[1]);

            if (
                Object.keys(coordenadas).includes(parametros[0]) &&
                Object.keys(coordenadas).includes(parametros[1])
            ) {
                let distancia = getDistanceBetween(
                    parametros[0],
                    parametros[1]
                );

                message.channel.send(
                    `La distancia entre ${parametros[0]} y ${parametros[1]} es de ${distancia}km`
                );
            } else {
                message.channel.send(
                    "Los parámetros que has indicado no son correctos"
                );
            }
        }
    }
};
