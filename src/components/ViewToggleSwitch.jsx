import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import PropTypes from 'prop-types';

const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white' height='20px' width='20px'>
  <path fill-rule='evenodd' d='M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z' clip-rule='evenodd'/>
  <path d='M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z'/>
</svg>`;

const ToggleSwitch = styled(Switch)(() => ({
  width: 80,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(4px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(43px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: 'white',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: '#001e3c',
    width: 32,
    height: 32,
    '&::before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white' width='20px' height='20px'><path fill-rule='evenodd' d='M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z' clip-rule='evenodd'/></svg>")`
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: 'white',
    borderRadius:  15,
  },
}));

const ViewToggleSwitch = ({ checked, onChange }) => {
  return (
    <ToggleSwitch 
      sx={{ m: 1 }} 
      checked={checked} 
      onChange={onChange} 
      defaultChecked 
    />
  );
};
ViewToggleSwitch.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ViewToggleSwitch;