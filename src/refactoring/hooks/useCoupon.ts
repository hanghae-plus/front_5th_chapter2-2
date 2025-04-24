import { useState, useMemo } from "react";
import { Coupon } from "../../types.ts";

/**
 * 쿠폰 관리 기능을 제공하는 커스텀 훅
 * 엔티티 상태: coupons
 * 액션 함수: addCoupon, removeCoupon
 * 순수 함수: getCouponByCode, calculateCouponDiscount
 */
export const useCoupons = (initialCoupons: Coupon[]) => {
  // 엔티티 상태
  const [coupons, setCoupons] = useState<Coupon[]>(() => initialCoupons);

  // UI 상태
  const [couponFilterText, setCouponFilterText] = useState<string>("");
  const [selectedCouponCode, setSelectedCouponCode] = useState<string | null>(
    null
  );

  /**
   * 쿠폰을 추가하는 액션 함수
   */
  const addCoupon = (coupon: Coupon) => {
    // 중복 쿠폰 코드 검사
    if (coupons.some((c) => c.code === coupon.code)) {
      console.error("이미 존재하는 쿠폰 코드입니다.");
      return false;
    }

    setCoupons((prevCoupons) => [...prevCoupons, coupon]);
    return true;
  };

  /**
   * 쿠폰을 삭제하는 액션 함수
   */
  const removeCoupon = (couponCode: string) => {
    setCoupons((prevCoupons) =>
      prevCoupons.filter((coupon) => coupon.code !== couponCode)
    );

    // 선택된 쿠폰이 삭제될 경우 선택 해제
    if (selectedCouponCode === couponCode) {
      setSelectedCouponCode(null);
    }
  };

  /**
   * 쿠폰 검색 필터를 변경하는 UI 액션 함수
   */
  const updateCouponFilter = (filterText: string) => {
    setCouponFilterText(filterText);
  };

  /**
   * 쿠폰을 선택하는 UI 액션 함수
   */
  const selectCoupon = (couponCode: string | null) => {
    setSelectedCouponCode(couponCode);
  };

  // 쿠폰 코드로 쿠폰을 찾는 순수 함수
  const getCouponByCode = (code: string): Coupon | undefined => {
    return coupons.find((coupon) => coupon.code === code);
  };

  // 선택된 쿠폰을 반환하는 순수 함수
  const getSelectedCoupon = (): Coupon | null => {
    if (!selectedCouponCode) return null;
    const selectedCoupon = getCouponByCode(selectedCouponCode);
    return selectedCoupon || null;
  };

  // 쿠폰 할인액을 계산하는 순수 함수
  const calculateCouponDiscount = (
    coupon: Coupon,
    originalPrice: number
  ): number => {
    if (coupon.discountType === "amount") {
      return Math.min(coupon.discountValue, originalPrice);
    } else {
      return originalPrice * (coupon.discountValue / 100);
    }
  };

  // 필터링된 쿠폰 목록 (useMemo로 성능 최적화)
  const filteredCoupons = useMemo(() => {
    if (!couponFilterText) return coupons;

    const lowerFilter = couponFilterText.toLowerCase();
    return coupons.filter(
      (coupon) =>
        coupon.name.toLowerCase().includes(lowerFilter) ||
        coupon.code.toLowerCase().includes(lowerFilter)
    );
  }, [coupons, couponFilterText]);

  return {
    // 엔티티 상태
    coupons: filteredCoupons,

    // UI 상태
    couponFilterText,
    selectedCouponCode,

    // 액션 함수
    addCoupon,
    removeCoupon,
    updateCouponFilter,
    selectCoupon,

    // 순수 함수 (계산)
    getCouponByCode,
    getSelectedCoupon,
    calculateCouponDiscount,
  };
};
