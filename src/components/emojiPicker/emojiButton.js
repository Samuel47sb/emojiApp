import "./styles.css"

export default function EmojiButton({emoji, onClick}) {

    function handleClick () {
        onClick(emoji);
    }

    return (
        <button className="emojiButton" onClick={handleClick}>{emoji.symbol}</button>
    )
}