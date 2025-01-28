import Aura from "@primeng/themes/aura";
import { definePreset } from "@primeng/themes";

const MyTheme = definePreset(Aura, {
    components: {
            card: {
                root:{
                    shadow: "2px 2px 2px 2px rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)"
                },
                body: {
                    padding: "3rem",
                }
            }
    },
    semantic: {
        primary: {
            50: "#f7faff",
            100: "#d7e8ff",
            200: "#b7d6ff",
            300: "#97c4ff",
            400: "#77b2ff",
            500: "#57a0ff",
            600: "#4a88d9",
            700: "#3d70b3",
            800: "#30588c",
            900: "#234066",
            950: "#162840"
        },
    }
});

export default MyTheme;