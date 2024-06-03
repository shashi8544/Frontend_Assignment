import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Autocomplete, TextField, CircularProgress, Box, Typography } from '@mui/material';
import './findCollege.css';


// FindCollege function to get college list from API and displaying it on frontend
const FindCollege = () => {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [logo, setLogo] = useState('');

  /// using useEffect hoop to get the all college response
  useEffect(() => {
    setLoading(true);
    axios.get('http://universities.hipolabs.com/search')
      .then(response => {
        setColleges(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching college data:', error);
        setLoading(false);
      });
  }, []);

  /// function to handle college name changed by the user, and fetch new college logo
  const handleCollegeChange = (event, newValue) => {
    setSelectedCollege(newValue);
    if (newValue) {
      const domain = newValue.domains[0];
      fetchLogo(domain);
    } else {
      setLogo('');
    }
  };
//// fetch logo function to fecth from API
  const fetchLogo = (domain) => {
    axios.get(`https://logo.clearbit.com/${domain}`)
      .then(response => {
        setLogo(`https://logo.clearbit.com/${domain}`);
      })
      .catch(error => {
        console.error('Error fetching logo:', error);
        setLogo('');
      });
  };

  ////// Using material UI, creating box for displaying the logo
  return (
    <Box className="autocomplete-container">
      <Typography variant="h4" gutterBottom>
        Get Your College Logo
      </Typography>
      <Autocomplete
        options={colleges}
        getOptionLabel={(option) => option.name}
        loading={loading}
        onChange={handleCollegeChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select a college"
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
        sx={{ mb: 2 }}
      />

      {/* conditional loading of college name selected, else hidden if not selected */}
      {selectedCollege && (
        <Box sx={{ mt: 3 }} bgcolor={'purple'}>
          <Typography variant="h6" className="college-title">{selectedCollege.name}</Typography>
          {logo ? (
            <img src={logo} alt={`${selectedCollege.name} logo`} className="college-logo" />
          ) : (
            <Typography variant="body2">Logo not available</Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default FindCollege;
