/* eslint-disable operator-linebreak */
import { CREATE_TASK_GROUP, UPDATE_TASK_GROUP, TASK_GROUP } from './url';
import APIService from './service';
import { calculatePosition } from '../_services/dnd';

export const create = async (data) => {
  try {
    const taskGroup = await APIService.post(`${CREATE_TASK_GROUP}`, {
      name: data.name,
      board_id: data.boardId,
      description: data.description,
    });

    return taskGroup;
  } catch (err) {
    throw new Error('[ERR] TaskGroupService: ', err);
  }
};

export const updateName = async (id, data) => {
  try {
    const taskGroup = await APIService.patch(`${UPDATE_TASK_GROUP}${id}`, {
      name: data.name,
      board_id: data.board_id,
      description: data.description,
    });

    return taskGroup;
  } catch (err) {
    throw new Error('[ERR] TaskGroupService: ', err);
  }
};

export const reOrder = async (item, prevItem, nextItem) => {
  try {
    const position = calculatePosition(item, prevItem, nextItem);

    const res = await APIService.patch(`${TASK_GROUP}/${item.id}`, {
      position,
    });

    return res.data;
  } catch (err) {
    throw new Error('[ERR] TaskGroupService: ', err);
  }
};
