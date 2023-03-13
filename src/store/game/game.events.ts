enum GameEvent {
  InitGame = 'onInitGame',
  SendRivalConnected = 'onRivalConnected',
  GetStatusInQueue = 'onGetStatusInQueue',
  GetGameData = 'onGetGameData',
  SendGameData = 'onSendGameData',
  GetBetsData = 'onGetBetsData',
  SendBetsData = 'onSendBetData',
  SendStatusInQueue = 'onSendStatusInQueue',
  SendUpdateBetsData = 'onSendUpdateBetsData',
  SendUpdateProvinces = 'onSendUpdateProvinces',
}

export default GameEvent;
