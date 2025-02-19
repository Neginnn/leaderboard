import styled from "@emotion/styled";
import { colours } from "@/styles/colours";
import { mediaQueries } from "@/styles/mediaQueries";

const { mobileOnly } = mediaQueries.device;

const {
  alabaster,
  white,
  grayNurse,
  red,
  blue,
  greyLine,
  separatorColor,
  boulder,
} = colours;

export const LeaderboardStyles = styled.div`
  padding: 20px;
  /* General Layout */
  .leaderboard-container {
    margin: 30px 0px;
    background-color: ${white};
  }

  .leaderboard-header {
    display: flex;
    justify-content: space-between;
    padding: 12px;
    background-color: ${boulder};
    border-bottom: 2px solid ${greyLine};
    flex: 1;
  }

  .leaderboard-header-item {
    font-weight: bold;
    cursor: pointer;
    text-align: left;
    flex: 1;
    padding: 8px;
    position: relative;
  }

  /* Sorting Arrows */
  .leaderboard-header-item::after {
    content: "";
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 6px solid ${greyLine};
    opacity: 0;
  }

  .leaderboard-header-item.asc::after {
    border-top: none;
    border-bottom: 6px solid ${greyLine};
  }

  .leaderboard-header-item.desc::after {
    border-top: 6px solid ${greyLine};
  }

  .leaderboard-header-item.sorting::after {
    opacity: 1;
  }

  /* Row Layout */
  .leaderboard-body {
    display: flex;
    flex-direction: column;
  }

  .leaderboard-row {
    display: flex;
    justify-content: space-between;
    padding: 12px;
    border-bottom: 1px solid ${greyLine};
    cursor: pointer;
    flex: 1;
  }

  .leaderboard-row:hover {
    background-color: ${alabaster};
  }

  /* Selected Row Styling */
  .leaderboard-row.selected {
    background-color: ${grayNurse};
  }

  /* Column Layout */
  .leaderboard-item {
    flex: 1;
    padding: 8px;
    word-wrap: break-word;
  }

  /* Button Styles */
  button {
    background-color: ${blue};
    color: ${white};
    border: none;
    border-radius: 5px;
    padding: 10px 10px;
    cursor: pointer;
    margin-right: 5px;
    transition: background-color 0.3s ease;
  }
  .leaderboard-actions {
    flex: 1;
    justify-content: space-between;
    align-items: center;
    button {
      font-size: 30px;
      line-height: 30px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      @media ${mobileOnly} {
        width: 10px;
        height: 10px;
        font-size: 22px;
        line-height: 15px;
      }
    }
    .delete-button {
      background-color: ${greyLine};
      width: 10px;
      height: 10px;
      font-size: 15px;
      line-height: 10px;
      vertical-align: middle;
    }
  }

  button:hover {
    opacity: 0.8;
  }

  button:focus {
    outline: none;
  }

  .search-bar {
    padding: 10px;
    border: 1px solid ${separatorColor};
    border-radius: 5px;
  }
  .leaderboard-actions {
    display: flex;
  }
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal-content {
    background-color: ${white};
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 300px;
    text-align: center;
  }

  .modal-header {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  .close-btn {
    background-color: ${red};
    color: ${white};
    border: none;
    padding: 8px 16px;
    font-size: 1rem;
    cursor: pointer;
    border-radius: 5px;
    margin-top: 20px;
  }

  .close-btn:hover {
    background-color: ${red};
  }
`;
