

// const handleScroll = (targetId: string) => (e: React.MouseEvent<HTMLElement>) => {
const handleScroll = (targetId: string) => (e?: any) => {
    // first prevent the default behavior
    // e.preventDefault();
    // get the href and remove everything before the hash (#)
    // const href = e.currentTarget.href;
    // const targetId = href.replace(/.*\#/, "");
    // get the element by id and use scrollIntoView
    const elem = document.getElementById(targetId);
    setTimeout(() => window.scrollTo({
        top: elem?.getBoundingClientRect().top,
        behavior: "smooth",
    }), 200);
};

export default handleScroll;