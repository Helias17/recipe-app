import  { useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
export const useOutsideDetector = (ref, callback) => {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                //console.log('ref:\n', ref.current);
                //console.log('event target:\n',event.target);
                callback();
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, callback]);
}

/**
 * Component that alerts if you click outside of it
 
export default function OutsideAlerter(props) {
    const wrapperRef = useRef(null);
    useOutsideDetector(wrapperRef);

    return <div ref={wrapperRef}>{props.children}</div>;
}

*/