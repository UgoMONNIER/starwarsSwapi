import React from 'react';
import { useEffect } from "react";


class Thumb extends React.Component {
  state = {
    loading: false,
    thumb: undefined,
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.file) { return; }

    this.setState({ loading: true }, () => {
      let reader = new FileReader();

      reader.onloadend = () => {
        this.setState({ loading: false, thumb: reader.result });
      };

      reader.readAsDataURL(nextProps.file);
    });
  }

  render() {
    const { file } = this.props;
    const { setThumb } = this.props;
    const { loading, thumb } = this.state;



    if (!file) { return null; }

    if (loading) { return <p>loading...</p>; }

    setThumb(thumb)
    return (
      <img src={thumb}
        alt={file.name}
        className="img-thumbnail mt-2"
        width={300} />);
  }
}

export default Thumb;