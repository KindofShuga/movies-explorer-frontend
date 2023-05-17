import './InfoTooltip.css'
import failIcon from '../../images/fail-icon.svg';
import successIcon from '../../images/success-icon.svg';

export default function InfoTooltip(props) {
    return (
        <div className={`popup ${props.isOpen ? 'popup__opened' : ''}`}>
            <div className="popup__container">
                <button type="button" aria-label="Закрыть" className="popup__close-btn" onClick={props.onClose} />
                <img
                    src={props.isSuccessInfoTooltip ? successIcon : failIcon}
                    alt={props.isSuccessInfoTooltip ? "Успешно" : "Ошибка"}
                />
                <h2 className="popup__heading">
                    {props.isSuccessInfoTooltip
                        ? "Успешно!"
                        : "Что-то пошло не так! Попробуйте ещё раз."}
                </h2>
            </div>
        </div>
    );
}