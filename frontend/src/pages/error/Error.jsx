import { Link } from "react-router-dom";
import styles from "./Error.module.css";

const Error = () => {
    return (
        <div>
            <div class={styles.principal}>
                <div class={styles.code}>404 </div>
                <div class={styles.message}>NOT FOUND</div>
            </div>
            <div class={styles.back}>
                <Link to='/'>Back to activate notes</Link></div>
        </div>
    );
}

export default Error;