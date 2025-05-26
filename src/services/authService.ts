import axios from 'axios';
import { APIResponse } from '../types';

// Base URL for API - replace with your actual API URL
const API_URL = 'http://localhost:3001/api';

/**
 * Send OTP to user's email
 */
export const sendOTP = async (email: string, eventId: number): Promise<APIResponse> => {
  try {
    const response = await axios.post(`${API_URL}/send-otp`, {
      email,
      eventId
    });
    
    return {
      success: true,
      message: response.data.message || 'OTP sent successfully'
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        message: error.response.data.message || 'Failed to send OTP'
      };
    }
    return {
      success: false,
      message: 'An unexpected error occurred'
    };
  }
};

/**
 * Verify OTP entered by user
 */
export const verifyOTP = async (email: string, eventId: number, otp: string): Promise<APIResponse> => {
  try {
    const response = await axios.post(`${API_URL}/verify-otp`, {
      email,
      eventId,
      otp
    });
    
    return {
      success: true,
      message: response.data.message || 'OTP verified successfully'
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        message: error.response.data.message || 'Invalid OTP'
      };
    }
    return {
      success: false,
      message: 'An unexpected error occurred'
    };
  }
};