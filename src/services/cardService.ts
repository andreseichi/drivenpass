import {
  findByEmail,
  findById,
  insert,
  remove,
} from "../repositories/cardRepository";
import { CardInsertData } from "../types/card";
import { decrypt, encrypt } from "../utils/hash";

export async function createCardService(cardData: CardInsertData) {
  const credentialDataInsert = {
    ...cardData,
    password: encrypt(cardData.password),
    securityCode: encrypt(cardData.securityCode),
  };

  const result = await insert(credentialDataInsert);
  if (!result) {
    throw {
      type: "CONFLICT",
      message: "Card title already exists for the user",
    };
  }
}

export async function getUserCardsService(email: string) {
  const cards = await findByEmail(email);

  const cardsData = cards.map((card) => {
    const {
      id,
      title,
      number,
      placeholderName,
      securityCode,
      expirationDate,
      isVirtual,
      password,
      createdAt,
    } = card;
    const passwordDecrypted = decrypt(password);
    const securityCodeDecrypted = decrypt(securityCode);
    return {
      id,
      title,
      number,
      placeholderName,
      securityCode: securityCodeDecrypted,
      expirationDate,
      password: passwordDecrypted,
      isVirtual,
      createdAt,
    };
  });

  return cardsData;
}

export async function getCardService(id: number, email: string) {
  const card = await findById(id, email);
  if (!card) {
    throw {
      type: "NOT_FOUND",
      message: "Card not found",
    };
  }

  const passwordDecrypted = decrypt(card.password);
  const securityCodeDecrypted = decrypt(card.securityCode);
  const cardData = {
    id: card.id,
    title: card.title,
    number: card.number,
    placeholderName: card.placeholderName,
    securityCode: securityCodeDecrypted,
    expirationDate: card.expirationDate,
    password: passwordDecrypted,
    isVirtual: card.isVirtual,
    createdAt: card.createdAt,
  };

  return cardData;
}

export async function deleteCardService(id: number, email: string) {
  const result = await remove(id, email);
  if (!result) {
    throw {
      type: "NOT_FOUND",
      message: "Card not found",
    };
  }
}
