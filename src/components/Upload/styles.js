import styled, { css } from 'styled-components';

const dragActive = css`
  border-color: #5d3ca1;
`;

const dragReject = css`
  border-color: #e57878;
`;

export const DropContainer = styled.div.attrs({
  className: 'dropzone',
})`
  border: 0.5px dashed #5d3ca1;
  border-radius: 6px;
  cursor: pointer;
  transition: height 0.2s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1em;
  width: 100%;
  text-align: center;
  ${(props) => props.isDragActive && dragActive};
  ${(props) => props.isDragReject && dragReject};
`;

const messageColors = {
  default: '#141417',
  error: '#e57878',
  success: '#065B36',
};

export const UploadMessage = styled.p`
  color: ${(props) => messageColors[props.type || 'default']};
  padding: 15px 0;
`;
