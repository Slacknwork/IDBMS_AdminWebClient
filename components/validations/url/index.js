const isValidUrl = (url) => {
    try {
        new URL(url);
        return url;
    } catch (error) {
        return "/images/results/no-image.png";
    }
};

export default isValidUrl;
