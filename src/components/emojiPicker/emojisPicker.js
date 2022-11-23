import { forwardRef, useRef, useState, useEffect } from "react";
import { data as emojiList } from "./data";
import EmojiButton from "./emojiButton";
import EmojiSearch from "./emojiSearch";
import "./styles.css"

export function EmojiPicker(props, inputRef) {

    const [isOpen, setIsOpen] = useState(false);
    const [emojis, setEmojis] = useState(emojiList)

    const containerRef = useRef();

    useEffect(() => {
      window.addEventListener('click', e => {
        if(!containerRef.current.contains(e.target)){
            setIsOpen(false);
            setEmojis(emojiList);
        }
      })
    }, [])
    

    function handleClickOpen() {
        setIsOpen(!isOpen);
    }

    function handleSearch(e) {
        const q = e.target.value.toLowerCase();

        if (!!q) {
            const search = emojiList.filter((emoji) => {
                return emoji.name.toLowerCase().includes(q)
                    || emoji.keywords.toLowerCase().includes(q)
            });

            setEmojis(search);
        }
        else {
            setEmojis(emojiList);
        }
    }

    // function EmojiPickerContainer() {
            
       
    // }

    function handleClickEmoji (emoji) {
        const cursoPos = inputRef.current.selectionStart;
        const text = inputRef.current.value;
        const prev = text.slice(0, cursoPos);
        const next = text.slice(cursoPos);

        inputRef.current.value = prev + emoji.symbol + next;
        inputRef.current.selectionStart = cursoPos + emoji.symbol.length;
        inputRef.current.selectionEnd = cursoPos + emoji.symbol.length;
        inputRef.current.focus();
    }

    return (
        <div ref={containerRef} className="inputContainer">
            <button className="emojiPickerButton" onClick={handleClickOpen}>😊</button>

            {isOpen ? (
                <div className="emojiPickerContainer">
                    <EmojiSearch onSearch={handleSearch} />
                    <div className="emojiList">
                        {emojis.map((emoji) => (
                            <EmojiButton key={emoji.symbol} emoji={emoji} 
                            onClick={handleClickEmoji}/>
                        ))}
                    </div>
                </div> 
                ):( ""
            )}
        </div>
    );
}

export default forwardRef(EmojiPicker);