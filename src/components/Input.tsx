import { ChangeEvent, Component, CSSProperties } from 'react';

interface Props {
    onChange: (value: string) => void;
    /** Delays calls to onChange in ms */
    delay?: number;
}

interface State {
    value: string;
}

class Input extends Component<Props, State> {
    timer?: NodeJS.Timeout;
    state: State = { value: '' };

    handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({value: event.target.value})
    }

    componentDidUpdate(_: Props, prevState: State) {
        const { delay, onChange } = this.props;
        const { value } = this.state;
        
        if (value && prevState.value !== value) {
            if (delay) {
                if (this.timer) clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    onChange(this.state.value);
                }, delay)
            } else {
                onChange(this.state.value);
            }
        }
    }

    render() {
        return (
            <input style={rootStyle}
                placeholder='Sök efter bilder'
                value={this.state.value} 
                onChange={this.handleChange}
            />           
        );
    }
}

const rootStyle: CSSProperties = {
    flex: 1,
    borderRadius: 100,
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    outline: 'none',
    marginTop: '1rem',
};

export default Input;