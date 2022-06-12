import React from 'react';

import styles from './selectionPanel.module.css';

class SelectionPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      curSelection: props.curSelection || props.selections[0],
      readonly: props.readonly || false,
    };
  }

  render() {
    const { selections, title } = this.props;
    const { curSelection } = this.state;

    return (
      <section className={styles['root']}>
        <p className={styles['title']}>{title}</p>
        <div className={styles['selections']}>
          {selections.map((selection) => (
            <div
              key={selection}
              className={
                selection === curSelection
                  ? `${styles['selection']}  ${styles['selected']}`
                  : styles['selection']
              }
              onClick={() => this.changeCurSelection(selection)}
            >
              {selection}
            </div>
          ))}
        </div>
      </section>
    );
  }

  changeCurSelection(curSelection) {
    if (!this.state.readonly) this.setState({ curSelection });
  }
}

export default SelectionPanel;
