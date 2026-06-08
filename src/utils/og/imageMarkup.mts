import type { Metadata } from "./interface";

const COLORS = {
    background: "#F9F9F7",
    ink: "#27271F",
    muted: "#71717A",
    dev: "#0BBCD4",
    beyond: "#E06035",
};

export const getImageMarkup = (metadata: Metadata) => {
    const isDev = metadata.type === "dev";
    const typeColor = isDev ? COLORS.dev : COLORS.beyond;
    const typeLabel = isDev ? "DEV" : "BEYOND";

    return {
        type: "div",
        props: {
            style: {
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "100%",
            },
            children: [
                {
                    type: "div",
                    props: {
                        style: {
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            backgroundColor: typeColor,
                            height: "40%",
                            padding: "52px 72px",
                        },
                        children: [
                            {
                                type: "span",
                                props: {
                                    style: {
                                        fontFamily: "IBMPlexMono",
                                        fontSize: 16,
                                        fontWeight: 600,
                                        color: "rgba(255,255,255,0.85)",
                                        letterSpacing: "0.2em",
                                        textTransform: "uppercase",
                                    },
                                    children: typeLabel,
                                },
                            },
                            {
                                type: "div",
                                props: {
                                    style: {
                                        display: "flex",
                                        flexWrap: "wrap",
                                        columnGap: 28,
                                    },
                                    children: metadata.tags.map((tag) => ({
                                        type: "span",
                                        props: {
                                            style: {
                                                fontFamily: "IBMPlexMono",
                                                fontSize: 13,
                                                fontWeight: 600,
                                                color: "rgba(255,255,255,0.65)",
                                                letterSpacing: "0.15em",
                                                textTransform: "uppercase",
                                            },
                                            children: tag,
                                        },
                                    })),
                                },
                            },
                        ],
                    },
                },

                {
                    type: "div",
                    props: {
                        style: {
                            display: "flex",
                            flexDirection: "column",
                            backgroundColor: COLORS.background,
                            height: "60%",
                            padding: "44px 72px",
                        },
                        children: [
                            {
                                type: "div",
                                props: {
                                    style: {
                                        display: "flex",
                                        flexGrow: 1,
                                        alignItems: "flex-start",
                                        overflow: "hidden",
                                    },
                                    children: [
                                        {
                                            type: "div",
                                            props: {
                                                style: {
                                                    fontFamily: "Lora",
                                                    fontSize: 54,
                                                    fontWeight: 700,
                                                    color: COLORS.ink,
                                                    lineHeight: 1.2,
                                                    letterSpacing: "-0.01em",
                                                    maxHeight: "200px",
                                                    overflow: "hidden",
                                                },
                                                children: metadata.title,
                                            },
                                        },
                                    ],
                                },
                            },

                            {
                                type: "div",
                                props: {
                                    style: {
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        flexShrink: 0,
                                        marginTop: "20px",
                                    },
                                    children: [
                                        {
                                            type: "span",
                                            props: {
                                                style: {
                                                    fontFamily: "IBMPlexMono",
                                                    fontSize: 14,
                                                    fontWeight: 400,
                                                    color: COLORS.muted,
                                                    letterSpacing: "0.03em",
                                                },
                                                children: "flavien bonvin",
                                            },
                                        },
                                        {
                                            type: "span",
                                            props: {
                                                style: {
                                                    fontFamily: "IBMPlexMono",
                                                    fontSize: 14,
                                                    fontWeight: 400,
                                                    color: COLORS.muted,
                                                    letterSpacing: "0.03em",
                                                },
                                                children: `${metadata.readingTime} min read`,
                                            },
                                        },
                                    ],
                                },
                            },
                        ],
                    },
                },
            ],
        },
    };
};
