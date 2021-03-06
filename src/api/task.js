import { CREATE_TASK, TASK } from './url';
import APIService from './service';
import { calculatePosition } from '../_services/dnd';

export const create = async (data) => {
  try {
    const res = await APIService.post(`${CREATE_TASK}`, {
      task_group_id: data.taskGroupId,
      is_done: 0,
      name: data.name,
      description: data.description,
    });
    return res.data;
  } catch (err) {
    throw new Error('[ERR] BoardService: ', err);
  }
};

export const reOrder = async (cur, prev, next, taskGroupId) => {
  try {
    const position = calculatePosition(cur, prev, next);

    const res = await APIService.patch(`${TASK}/${cur.id}`, {
      position,
      taskGroupId,
    });

    return res.data;
  } catch (err) {
    throw new Error('[ERR] BoardService: ', err);
  }
};
