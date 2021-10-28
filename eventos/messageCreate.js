const fs = require("fs");
const prefix = require("..");
const geolib = require("geolib");

let coordenadas = JSON.parse(
    fs.readFileSync(__dirname + "/../localidades.json", "utf-8")
);

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

            if (
                Object.keys(coordenadas).includes(parametros[0]) &&
                Object.keys(coordenadas).includes(parametros[1])
            ) {
                let distancia = geolib
                    .convertDistance(
                        geolib.getDistance(
                            {
                                latitude: coordenadas[parametros[0]].latitud,
                                longitude: coordenadas[parametros[0]].longitud
                            },
                            {
                                latitude: coordenadas[parametros[1]].latitud,
                                longitude: coordenadas[parametros[1]].longitud
                            }
                        ),
                        "km"
                    )
                    .toFixed(2);

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
