import styled, { css } from 'styled-components';

const dragActive = css`
  border-color: #78e5d5;
`;

const dragReject = css`
  border-color: #e57878;
`;

export const DropContainer = styled.div.attrs({
  className: 'dropzone',
})`
  border: 1px dashed #ddd;
  border-radius: 6px;
  cursor: pointer;
  height: 170px;
  transition: height 0.2s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1em;
  ${(props) => props.isDragActive && dragActive};
  ${(props) => props.isDragReject && dragReject};
`;

const messageColors = {
  default: '#999',
  error: '#e57878',
  success: '#7fffd4',
};

export const UploadMessage = styled.p`
  color: ${(props) => messageColors[props.type || 'default']};
  padding: 15px 0;
`;
